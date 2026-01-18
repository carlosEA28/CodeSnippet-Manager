package main

import (
	"auth-service/internal/web/server"
	"database/sql"
	"fmt"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"log"
	"os"
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

	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		getEnv("DB_HOST", "db"),
		getEnv("DB_PORT", "5432"),
		getEnv("DB_USER", "postgres"),
		getEnv("DB_PASSWORD", "postgres"),
		getEnv("DB_NAME", "auth_service"),
		getEnv("DB_SSL_MODE", "disable"),
	)

	//Inicia a conn com o banco de dados
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	//fecha a conexao com o banco de dados
	defer db.Close()

	// Configura e inicia o servidor HTTP
	port := getEnv("HTTP_PORT", "8080")
	srv := server.NewServer(port)

	if err := srv.Start(); err != nil {
		log.Fatal("Error starting server: ", err)
	}

}
