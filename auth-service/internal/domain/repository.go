package domain

type UserRepository interface {
	CreateUser(user *User) error
	FindByEmail(email string) (*User, error)
}
