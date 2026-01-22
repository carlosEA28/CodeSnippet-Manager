package messaging

import (
	"auth-service/internal/domain/events"
	"context"
	"encoding/json"
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

type RabbitMQPublisher struct {
	conn    *amqp.Connection
	channel *amqp.Channel
}

func NewPublisher(conn *amqp.Connection) (*RabbitMQPublisher, error) {
	channel, err := conn.Channel()
	if err != nil {
		return nil, err
	}

	err = channel.ExchangeDeclare(
		"user.exchange", // name
		"topic",         // type
		true,            // durable
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return nil, err
	}

	queue, err := channel.QueueDeclare(
		"user.created.queue",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return nil, err
	}

	err = channel.QueueBind(
		queue.Name,
		"user.created.queue", // routing key
		"user.exchange",
		false,
		nil,
	)
	if err != nil {
		return nil, err
	}

	return &RabbitMQPublisher{
		conn:    conn,
		channel: channel,
	}, nil
}

func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}

func (r *RabbitMQPublisher) PublishUserCreated(ctx context.Context, event events.UserCreatedEvent) error {

	body, _ := json.Marshal(event)

	return r.channel.Publish(
		"user.exchange", "user.created.queue", false, false, amqp.Publishing{
			ContentType: "application/json",
			Body:        body,
		})
}
