package main

import (
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/iMeisa/meisa.xyz/pkg/config"
	"github.com/iMeisa/meisa.xyz/pkg/handlers"
	"net/http"
)

func routes(_ *config.AppConfig) http.Handler {
	mux := chi.NewRouter()

	// Middleware
	mux.Use(middleware.Recoverer)
	mux.Use(NoSurf)
	mux.Use(SessionLoad)

	// Pages
	mux.Get("/", handlers.Repo.Home)
	mux.Get("/about", handlers.Repo.About)
	mux.Get("/calculator", handlers.Repo.Calculator)
	mux.Post("/calculator", handlers.Repo.PostCalculator)
	mux.Get("/morse", handlers.Repo.Morse)
	mux.Get("/tradewinds", handlers.Repo.Tradewinds)
	mux.Get("/transcriber", handlers.Repo.Transcriber)

	// HTML static files location
	fileServer := http.FileServer(http.Dir("./static/"))
	mux.Handle("/static/*", http.StripPrefix("/static", fileServer))
	return mux
}
