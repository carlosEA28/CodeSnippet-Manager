package repository

import (
	"auth-service/internal/domain"
	"database/sql"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{
		db: db,
	}
}

func (r *UserRepository) CreateUser(user *domain.User) error {
	stmt, err := r.db.Prepare(`
		INSERT INTO users (
			cognito_id,
			username,
			email,
			profile_picture,
			bio
		) VALUES ($1, $2, $3, $4, $5)
	`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(
		user.CognitoId,
		user.Username,
		user.Email,
		user.ProfilePicture,
		user.Bio,
	)

	return err
}

func (r *UserRepository) FindByEmail(email string) (*domain.User, error) {

	var user domain.User

	err := r.db.QueryRow(`
	SELECT
		id,
		cognito_id,
		username,
		email,
		profile_picture,
		bio,
		created_at,
		updated_at
	FROM users
	WHERE email = $1
`, email).Scan(
		&user.ID,
		&user.CognitoId,
		&user.Username,
		&user.Email,
		&user.ProfilePicture,
		&user.Bio,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, domain.ErrUserNotFound
	}

	if err != nil {
		return nil, err
	}

	return &user, nil
}
