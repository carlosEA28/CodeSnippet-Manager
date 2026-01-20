package domain

import "errors"

var (
	ErrUserNotFound       = errors.New("User not found")
	ErrUnauthorizedAccess = errors.New("Unauthorized")
	ErrUserAlreadyExists  = errors.New("User already exists")
)
