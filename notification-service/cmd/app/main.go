package main

import (
	"log"
	"notification-service/internal/web/server"
	"os"

	"github.com/joho/godotenv"
)

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}

	return defaultValue
}

func main() {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Errorz loading .env file")
	}

	port := getEnv("HTTP_PORT", "8080")
	srv := server.NewServer(port)

	if err := srv.Start(); err != nil {
		log.Fatal("Error starting server: ", err)
	}
}
