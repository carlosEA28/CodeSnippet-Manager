package messaging

import (
	"context"
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

type MessageHandler func(ctx context.Context, msg amqp.Delivery) error

func (r *RabbitMQPublisher) Consume(ctx context.Context,
	queueName string,
	handler MessageHandler) error {
	msgs, err := r.channel.Consume(
		"user.created.queue",
		"",
		true,
		false,
		false,
		false,
		nil)

	if err != nil {
		return err
	}

	go func() {
		for {
			select {
			case <-ctx.Done():
				log.Println("consumer stopped")
				return

			case msg, ok := <-msgs:
				if !ok {
					log.Println("channel closed")
					return
				}

				if err := handler(ctx, msg); err != nil {
					log.Printf("handler error: %v", err)

					_ = msg.Nack(false, true)
					continue
				}

				if err := msg.Ack(false); err != nil {
					log.Printf("ack error: %v", err)
				}
			}
		}
	}()

	return nil
}
