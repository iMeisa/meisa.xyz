package handlers

import (
	"fmt"
	"github.com/iMeisa/meisa.xyz/pkg/apps/calculator"
	"github.com/iMeisa/meisa.xyz/pkg/config"
	"github.com/iMeisa/meisa.xyz/pkg/models"
	"github.com/iMeisa/meisa.xyz/pkg/render"
	"net/http"
)

// Repo the repository used by the handlers
var Repo *Repository

// Repository is the repository type
type Repository struct {
	App *config.AppConfig
}

// NewRepo creates a new repository
func NewRepo(a *config.AppConfig) *Repository {
	return &Repository{
		App: a,
	}
}

// NewHandlers sets the repository for the handlers
func NewHandlers(r *Repository) {
	Repo = r
}

func (m *Repository) Home(w http.ResponseWriter, r *http.Request) {
	remoteIP := r.RemoteAddr
	m.App.Session.Put(r.Context(), "remote_ip", remoteIP)

	render.Template(w, r, "home.page.tmpl", &models.TemplateData{})
}

func (m *Repository) About(w http.ResponseWriter, r *http.Request) {
	// perform some logic
	stringMap := make(map[string]string)
	stringMap["test"] = "Hello, again."

	remoteIP := m.App.Session.GetString(r.Context(), "remote_ip")
	stringMap["remote_ip"] = remoteIP

	// send the data to the template
	render.Template(w, r, "about.page.tmpl", &models.TemplateData{
		StringMap: stringMap,
	})
}

func (m *Repository) Calculator(w http.ResponseWriter, r *http.Request) {
	render.Template(w, r, "calculator.page.tmpl", &models.TemplateData{})
}

func (m *Repository) PostCalculator(w http.ResponseWriter, r *http.Request) {
	num1 := r.Form.Get("calc-1")
	num2 := r.Form.Get("calc-2")
	fmt.Println(num1, num2)
	result := calculator.Add(num1, num2)
	fmt.Println(result)

	stringMap := make(map[string]string)
	stringMap["calcResult"] = result

	render.Template(w, r, "calculator.page.tmpl", &models.TemplateData{
		StringMap: stringMap,
	})
}
