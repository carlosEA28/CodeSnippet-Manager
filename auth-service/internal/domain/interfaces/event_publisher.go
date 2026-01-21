package interfaces

import (
	"auth-service/internal/domain/events"
	"context"
)

type EventPublisher interface {
	PublishUserCreated(ctx context.Context, event events.UserCreatedEvent) error
}
