package events

import "time"

type UserCreatedEvent struct {
	UserID     string
	Email      string
	CognitoID  string
	OccurredAt time.Time
}
