package domain

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID             string
	CognitoId      string
	Username       string
	Email          string
	ProfilePicture string
	Bio            string
	CreatedAt      time.Time
	UpdatedAt      time.Time
}

func NewUser(username, email, password, cognitoId, profilePicture, bio string) *User {
	return &User{
		ID:             uuid.New().String(),
		CognitoId:      cognitoId,
		Username:       username,
		Email:          email,
		ProfilePicture: profilePicture,
		Bio:            bio,
		CreatedAt:      time.Now(),
		UpdatedAt:      time.Now(),
	}
}
