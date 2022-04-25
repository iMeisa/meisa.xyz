package handlers

import (
	"encoding/json"
	"fmt"
	"github.com/iMeisa/meisa.xyz/apps/calculator"
	"github.com/iMeisa/meisa.xyz/apps/stardew"
	"github.com/iMeisa/meisa.xyz/internal/config"
	"github.com/iMeisa/meisa.xyz/internal/models"
	"github.com/iMeisa/meisa.xyz/internal/render"
	"github.com/iMeisa/meisa.xyz/internal/stats"
	"io/ioutil"
	"log"
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
	result := calculator.Add(num1, num2)

	stringMap := make(map[string]string)
	stringMap["calcResult"] = result

	render.Template(w, r, "calculator.page.tmpl", &models.TemplateData{
		StringMap: stringMap,
	})
}

func (m *Repository) F1Setup(w http.ResponseWriter, r *http.Request) {
	stringMap := make(map[string]string)
	partsList , err := ioutil.ReadFile("./static/json/f1setup/parts_list.json")
	if err == nil {
		stringMap["parts_list"] = string(partsList)
	} else {
		fmt.Println(err)
	}

	partGroupNames, err := ioutil.ReadFile("./static/json/f1setup/part_group_names.json")
	if err == nil {
		stringMap["part_group_names"] = string(partGroupNames)
	} else {
		fmt.Println(err)
	}

	setupSuggestions, err := ioutil.ReadFile("./static/json/f1setup/setup_suggestions.json")
	if err == nil {
		stringMap["setup_suggestions"] = string(setupSuggestions)
	} else {
		fmt.Println(err)
	}

	render.Template(w, r, "f1setup.page.tmpl", &models.TemplateData{
		StringMap: stringMap,
	})
}

func (m *Repository) MHWSetup(w http.ResponseWriter, r *http.Request) {
	render.Template(w, r, "mhwsetup.page.tmpl", &models.TemplateData{})
}

func (m *Repository) Morse(w http.ResponseWriter, r *http.Request) {
	render.Template(w, r, "morse.page.tmpl", &models.TemplateData{})
}

func (m *Repository) SAP(w http.ResponseWriter, r *http.Request) {
	stringMap := make(map[string]string)

	petsJSON, err := ioutil.ReadFile("./static/json/SAP/pets.json")
	if err != nil {
		log.Println(err)
	}

	stringMap["sap"] = string(petsJSON)

	render.Template(w, r, "saprandom.page.tmpl", &models.TemplateData{
		StringMap: stringMap,
	})
}

func (m *Repository) Stardew(w http.ResponseWriter, r *http.Request) {
	render.Template(w, r, "stardew.page.tmpl", &models.TemplateData{})
}

func (m *Repository) StardewJSON(w http.ResponseWriter, _ *http.Request) {
	items := stardew.QueryBundles()

	itemsJSON, err := json.MarshalIndent(items, "", "	")
	if err != nil {
		fmt.Println("Could not convert to JSON:", err)
	}
	w.Header().Set("Content-Type", "application/json")
	_, _ = w.Write(itemsJSON)
}

func (m *Repository) Stats(w http.ResponseWriter, r *http.Request) {
	stringMap := make(map[string]string)
	stringMap["stats"] = stats.GetAsString()

	render.Template(w, r, "stats.page.tmpl", &models.TemplateData{
		StringMap: stringMap,
	})
}

func (m *Repository) Tradewinds(w http.ResponseWriter, r *http.Request) {
	render.Template(w, r, "tradewinds.page.tmpl", &models.TemplateData{})
}

func (m *Repository) Transcriber(w http.ResponseWriter, r *http.Request) {
	render.Template(w, r, "transcriber.page.tmpl", &models.TemplateData{})
}
