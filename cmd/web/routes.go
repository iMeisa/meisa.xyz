package main

import (
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/iMeisa/meisa.xyz/internal/config"
	"github.com/iMeisa/meisa.xyz/internal/handlers"
	"net/http"
)

// routes directs traffic to selected pages
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
	mux.Get("/f1setup", handlers.Repo.F1Setup)
	mux.Get("/mhwsetup", handlers.Repo.MHWSetup)
	mux.Get("/morse", handlers.Repo.Morse)
	mux.Get("/sap", handlers.Repo.SAP)
	mux.Get("/stardew", handlers.Repo.Stardew)
	mux.Post("/stardew-json", handlers.Repo.StardewJSON)
	mux.Get("/stats", handlers.Repo.Stats)
	mux.Get("/tradewinds", handlers.Repo.Tradewinds)
	mux.Get("/transcriber", handlers.Repo.Transcriber)

	// HTML static files location
	fileServer := http.FileServer(http.Dir("./static/"))
	mux.Handle("/static/*", http.StripPrefix("/static", fileServer))
	return mux
}
