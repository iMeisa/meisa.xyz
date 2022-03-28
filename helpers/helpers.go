package helpers

func Contains(s []string, searchTerm string) bool {
	for _, a := range s {
		if a == searchTerm {
			return true
		}
	}
	return false
}
