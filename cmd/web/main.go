package main

import (
	"fmt"
	"github.com/alexedwards/scs/v2"
	"github.com/iMeisa/meisa.xyz/internal/config"
	"github.com/iMeisa/meisa.xyz/internal/handlers"
	"github.com/iMeisa/meisa.xyz/internal/render"
	"log"
	"net/http"
	"time"
)

const portNumber = ":8080"

var app config.AppConfig
var session *scs.SessionManager

func main() {

	// If true then site will cache data
	app.Prod = false

	// Define session params
	session = scs.New()
	session.Lifetime = 24 * time.Hour
	session.Cookie.Persist = true
	session.Cookie.SameSite = http.SameSiteLaxMode
	session.Cookie.Secure = app.Prod

	app.Session = session

	tc, err := render.CreateTemplateCache()
	if err != nil {
		log.Fatal("cannot create template cache")
	}

	app.TemplateCache = tc
	app.UseCache = false

	// Create Repository for all page handlers
	repo := handlers.NewRepo(&app)
	handlers.NewHandlers(repo)
	render.NewTemplates(&app)

	fmt.Println(fmt.Sprintf("Starting application on port %s", portNumber))

	// Create server
	srv := &http.Server{
		Addr:    portNumber,
		Handler: routes(&app),
	}

	// Start server
	err = srv.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
