package service

import (
	"auth-service/internal/domain"
	"auth-service/internal/domain/events"
	"auth-service/internal/dto"
	"auth-service/internal/infrastructure/aws/cognito"
	"auth-service/internal/infrastructure/aws/s3"
	"auth-service/internal/infrastructure/messaging"
	"context"
	"errors"
	"fmt"
	"os"
	"time"
)

type UserService struct {
	userRepo       domain.UserRepository
	cognitoService *cognito.CognitoService
	publisher      *messaging.RabbitMQPublisher
	s3Service      *s3.S3Service
}

func NewUserService(
	repository domain.UserRepository,
	cognitoService *cognito.CognitoService,
	publisher *messaging.RabbitMQPublisher,
	s3Service *s3.S3Service,
) *UserService {
	return &UserService{
		userRepo:       repository,
		cognitoService: cognitoService,
		publisher:      publisher,
		s3Service:      s3Service,
	}
}

func (s *UserService) CreateUser(
	input dto.CreateUserDto,
) (*dto.UserResponseDto, error) {

	ctx := context.Background()

	_, err := s.userRepo.FindByEmail(input.Email)
	if err == nil {
		return nil, domain.ErrUserNotFound
	}
	if err != domain.ErrUserNotFound {
		return nil, err
	}

	// 2. cria no Cognito
	signUpResp, err := s.cognitoService.SignUp(
		ctx,
		input.Password,
		input.Email,
	)
	if err != nil {
		return nil, err
	}

	objectKey, uploadURL, err := s.generateProfilePictureUploadURL(
		ctx,
		signUpResp.CognitoId,
	)
	if err != nil {
		return nil, err
	}

	user := dto.ToUser(input)
	user.CognitoId = signUpResp.CognitoId
	user.ProfilePicture = objectKey

	if err := s.userRepo.CreateUser(user); err != nil {
		return nil, err
	}

	output := dto.FromUser(user)
	output.ProfilePicture = uploadURL
	return &output, nil
}

func (s *UserService) LoginUser(input dto.LoginUserDto) (map[string]string, error) {

	ctx := context.Background()

	existsingUser, err := s.userRepo.FindByEmail(input.Email)
	if existsingUser == nil || err != nil {
		return map[string]string{}, domain.ErrUserNotFound
	}

	authResult, err := s.cognitoService.SignIn(ctx, os.Getenv("COGNITO_CLIENT_ID"), input.Email, input.Password)

	if err != nil {
		return map[string]string{}, domain.ErrInvalidCredentials
	}

	if authResult.AccessToken == nil ||
		authResult.RefreshToken == nil {
		return nil, errors.New("invalid auth result from Cognito")
	}

	event := events.UserCreatedEvent{
		UserID:     existsingUser.ID,
		Email:      existsingUser.Email,
		CognitoID:  existsingUser.CognitoId,
		OccurredAt: time.Now(),
	}

	_ = s.publisher.PublishUserCreated(ctx, event)

	return map[string]string{
		"accessToken":  *authResult.AccessToken,
		"refreshToken": *authResult.RefreshToken,
	}, nil

}

// privados
func (s *UserService) generateProfilePictureUploadURL(
	ctx context.Context,
	cognitoId string,
) (string, string, error) {

	objectKey := fmt.Sprintf(
		"users/%s/profile/avatar.jpg",
		cognitoId,
	)

	request, err := s.s3Service.PutObject(
		ctx,
		os.Getenv("BUCKET_NAME"),
		objectKey,
		300,
	)
	if err != nil {
		return "", "", err
	}

	// retorna objectKey + presigned URL
	return objectKey, request.URL, nil
}
