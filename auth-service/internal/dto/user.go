package dto

import (
	"auth-service/internal/domain"
	"time"
)

type CreateUserDto struct {
	CognitoId      string `json:"cognito_id"`
	Username       string `json:"username" validate:"required"`
	Email          string `json:"email" validate:"required,email"`
	Password       string `json:"password" validate:"required"`
	ProfilePicture string `json:"profile_picture"`
	Bio            string `json:"bio"`
}

type UserResponseDto struct {
	ID             string    `json:"id"`
	CognitoId      string    `json:"cognitoId" validate:"required"`
	Username       string    `json:"name" validate:"required"`
	Email          string    `json:"email" validate:"required,email"`
	ProfilePicture string    `json:"profile_picture"`
	Bio            string    `json:"bio"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

func ToUser(input CreateUserDto) *domain.User {
	return domain.NewUser(input.Username, input.Email, input.Password, input.CognitoId, input.ProfilePicture, input.Bio)
}

func FromUser(user *domain.User) UserResponseDto {
	return UserResponseDto{
		ID:             user.ID,
		CognitoId:      user.CognitoId,
		Username:       user.Username,
		Email:          user.Email,
		ProfilePicture: user.ProfilePicture,
		Bio:            user.Bio,
		CreatedAt:      user.CreatedAt,
		UpdatedAt:      user.UpdatedAt,
	}
}
