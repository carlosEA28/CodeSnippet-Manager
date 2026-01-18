package server

import (
	"github.com/go-chi/chi/v5"
	"net/http"
)

type Server struct {
	router *chi.Mux
	server *http.Server
	port   string
}

// construtor de server
func NewServer(port string) *Server {
	return &Server{
		router: chi.NewRouter(),
		port:   port,
	}
}

func (s *Server) Start() error {
	s.server = &http.Server{
		Addr:    ":" + s.port,
		Handler: s.router,
	}

	return s.server.ListenAndServe()
}
