package calculator

type CalcResult struct {
	Success     bool   `json:"success"`
	Value       int    `json:"value"`
	ErrorOutput string `json:"error_output"`
}
