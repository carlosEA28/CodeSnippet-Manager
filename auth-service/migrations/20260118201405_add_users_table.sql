-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE account_status AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'SUSPENDED',
    'BANNED'
);

CREATE TABLE users (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       cognito_id VARCHAR(100) NOT NULL UNIQUE,
                       username VARCHAR(50) NOT NULL UNIQUE,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       profile_picture TEXT NULL,
                       bio TEXT NULL,
                       account_status account_status NOT NULL DEFAULT 'ACTIVE',
                       last_login TIMESTAMP WITH TIME ZONE,
                       created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
                       updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS account_status;
-- +goose StatementEnd
