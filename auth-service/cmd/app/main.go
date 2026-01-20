package main

import (
	"auth-service/internal/infrastructure/aws/cognito"
	s3ServiceImport "auth-service/internal/infrastructure/aws/s3"
	"auth-service/internal/repository"
	"auth-service/internal/service"
	"auth-service/internal/web/server"
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/aws/aws-sdk-go-v2/config"
	cognitoSdk "github.com/aws/aws-sdk-go-v2/service/cognitoidentityprovider"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
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

	// inicia aws
	ctx := context.Background()
	awsCfg, err := config.LoadDefaultConfig(ctx,
		config.WithRegion(getEnv("AWS_REGION", "sa-east-1")),
	)
	if err != nil {
		log.Fatal(err)
	}

	//aws client
	s3Client := s3.NewFromConfig(awsCfg)
	cognitoClient := cognitoSdk.NewFromConfig(awsCfg)

	//aws services
	cognitoService := cognito.NewCognitoAction(cognitoClient)
	s3Service := s3ServiceImport.NewS3Service(s3Client)

	//inicia camadas user
	userRepository := repository.NewUserRepository(db)
	userService := service.NewUserService(userRepository, cognitoService, s3Service)

	// Configura e inicia o servidor HTTP
	port := getEnv("HTTP_PORT", "8080")
	srv := server.NewServer(userService, s3Service, cognitoService, port)
	srv.ConfigRoutes()

	if err := srv.Start(); err != nil {
		log.Fatal("Error starting server: ", err)
	}

}
