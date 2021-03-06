package config

import (
	"github.com/alexedwards/scs/v2"
	"html/template"
	"log"
)

// AppConfig holds the application config
type AppConfig struct {
	UseCache      bool
	TemplateCache map[string]*template.Template
	InfoLog       log.Logger
	Prod          bool
	Session       *scs.SessionManager
}

// StatsConfig holds the data config for stats.json
type StatsConfig struct {
	Hits      map[string]int `json:"hits"`
	UniqueIPs []string       `json:"ips"`
}
