package calculator

import "strconv"

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
