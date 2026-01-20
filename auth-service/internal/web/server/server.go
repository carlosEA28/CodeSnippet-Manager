package server

import (
	"auth-service/internal/infrastructure/aws/cognito"
	"auth-service/internal/infrastructure/aws/s3"
	"auth-service/internal/service"
	"auth-service/internal/web/handlers"
	"net/http"

	"github.com/go-chi/chi/v5"
)

type Server struct {
	router         *chi.Mux
	server         *http.Server
	userService    *service.UserService
	cognitoService *cognito.CognitoService
	s3Service      *s3.S3Service
	port           string
}

// construtor de server
func NewServer(userService *service.UserService, s3Service *s3.S3Service, cognitoService *cognito.CognitoService, port string) *Server {
	return &Server{
		router:         chi.NewRouter(),
		userService:    userService,
		cognitoService: cognitoService,
		s3Service:      s3Service,
		port:           port,
	}
}

func (s *Server) ConfigRoutes() {
	userHandler := handlers.NewUserHandler(*s.userService)

	s.router.Group(func(r chi.Router) {
		s.router.Route("/users", func(r chi.Router) {
			r.Post("/", userHandler.CreateUser)
			r.Post("/login", userHandler.LoginUser)
		})
	})
}

func (s *Server) Start() error {
	s.server = &http.Server{
		Addr:    ":" + s.port,
		Handler: s.router,
	}

	return s.server.ListenAndServe()
}
