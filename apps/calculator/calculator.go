package calculator

import (
	"encoding/json"
	"strconv"
)

func Add(a, b string) string {
	valid := true

	num1, err := strconv.Atoi(a)
	if err != nil {
		valid = false
	}

	num2, err := strconv.Atoi(b)
	if err != nil {
		valid = false
	}

	if valid {
		return strconv.Itoa(num1 + num2)
	}

	return "error"
}

func AddJSON(a, b string) (json.RawMessage, error) {
	result := CalcResult{
		Success: true,
		Value:   0,
	}

	num1, err := strconv.Atoi(a)
	if err != nil {
		result.Success = false
		result.ErrorOutput = "Invalid number"
	}

	num2, err := strconv.Atoi(b)
	if err != nil {
		result.Success = false
		result.ErrorOutput = "Invalid number"
	}

	if result.Success {
		result.Value = num1 + num2
	}

	return json.MarshalIndent(result, "", "	")
}
