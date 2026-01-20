package service

import (
	"auth-service/internal/domain"
	"auth-service/internal/dto"
	"auth-service/internal/infrastructure/aws/cognito"
	"auth-service/internal/infrastructure/aws/s3"
	"context"
	"fmt"
	"os"
)

type UserService struct {
	userRepo       domain.UserRepository
	cognitoService *cognito.CognitoService
	s3Service      *s3.S3Service
}

func NewUserService(
	repository domain.UserRepository,
	cognitoService *cognito.CognitoService,
	s3Service *s3.S3Service,
) *UserService {
	return &UserService{
		userRepo:       repository,
		cognitoService: cognitoService,
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
