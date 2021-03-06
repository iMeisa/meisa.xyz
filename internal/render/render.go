package render

import (
	"bytes"
	"fmt"
	"github.com/iMeisa/meisa.xyz/internal/config"
	"github.com/iMeisa/meisa.xyz/internal/models"
	"github.com/iMeisa/meisa.xyz/internal/network"
	"github.com/iMeisa/meisa.xyz/internal/stats"
	"github.com/justinas/nosurf"
	"html/template"
	"log"
	"net/http"
	"path/filepath"
)

var functions = template.FuncMap{}

var app *config.AppConfig

// NewTemplates loads app config for render.go
func NewTemplates(a *config.AppConfig) {
	app = a
}

// AddDefaultData adds data to app config by default
func AddDefaultData(data *models.TemplateData, r *http.Request) *models.TemplateData {
	data.CSRFToken = nosurf.Token(r)
	return data
}

// Template renders selected template
func Template(w http.ResponseWriter, r *http.Request, tmpl string, data *models.TemplateData) {

	var templateCache map[string]*template.Template

	if app.UseCache {
		// Get the page cache from the app config
		templateCache = app.TemplateCache
	} else {
		templateCache, _ = CreateTemplateCache()
	}

	page, ok := templateCache[tmpl]
	if !ok {
		log.Fatal("page is not ok")
	}

	buf := new(bytes.Buffer)

	data = AddDefaultData(data, r)

	_ = page.Execute(buf, data)

	_, err := buf.WriteTo(w)
	if err != nil {
		fmt.Println("Error writing page to browser:", err)
	}

	stats.Write(tmpl, network.GetRealIP(r))
}

// CreateTemplateCache loads all layout templates
func CreateTemplateCache() (map[string]*template.Template, error) {

	myCache := map[string]*template.Template{}

	pages, err := filepath.Glob("./templates/*.page.tmpl")
	if err != nil {
		return myCache, err
	}

	for _, page := range pages {
		name := filepath.Base(page)
		templates, err := template.New(name).Funcs(functions).ParseFiles(page)
		if err != nil {
			return myCache, err
		}

		matches, err := filepath.Glob("./templates/*.layout.tmpl")
		if err != nil {
			return myCache, err
		}

		if len(matches) > 0 {
			templates, err = templates.ParseGlob("./templates/*.layout.tmpl")
			if err != nil {
				return myCache, err
			}
		}

		myCache[name] = templates
	}

	return myCache, nil
}
