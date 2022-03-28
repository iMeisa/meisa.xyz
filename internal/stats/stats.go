package stats

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/iMeisa/meisa.xyz/helpers"
	"github.com/iMeisa/meisa.xyz/internal/config"
	"io/ioutil"
	"os"
)

const location = "data/stats.json"

func Write(pageName, IP string) {
	fmt.Println(pageName)
	statsData := read()

	if val, ok := statsData.Hits[pageName]; ok {
		statsData.Hits[pageName] = val + 1
	} else {
		statsData.Hits[pageName] = 1
	}

	if !helpers.Contains(statsData.UniqueIPs, IP) {
		statsData.UniqueIPs =  append(statsData.UniqueIPs, IP)
	}

	updatedStats, err := json.MarshalIndent(statsData, "", "	")
	if err != nil {
		fmt.Println(err)
	}

	err = ioutil.WriteFile(location, updatedStats, 0644)
	if err != nil {
		fmt.Println(err)
	}


	fmt.Println(statsData, IP)
}

func read() config.StatsConfig {
	if _, err := os.Stat(location); errors.Is(err, os.ErrNotExist) {
		createFile()
	}

	statsFile, err := os.Open(location)
	if err != nil {
		fmt.Println(err)
	}
	defer statsFile.Close()

	byteValue, err := ioutil.ReadAll(statsFile)
	if err != nil {
		fmt.Println(err)
	}

	var statsData config.StatsConfig

	err = json.Unmarshal(byteValue, &statsData)
	if err != nil {
		fmt.Println(err)
	}

	return statsData
}

func createFile() {
	newStatsFile := config.StatsConfig{
		Hits: map[string]int{},
		UniqueIPs: []string{},
	}

	file, _ := json.MarshalIndent(newStatsFile, "", "	")

	if err := os.Mkdir("data", os.ModePerm); err != nil {
		fmt.Println(err)
	}

	_ = ioutil.WriteFile(location, file, 0644)
}
