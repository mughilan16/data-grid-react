package util

import (
	"errors"
	"strings"
)

func GetFileExtension(fileName string) (string, error) {
	file := strings.Split(fileName, ".")
	if len(file) == 1 {
		return "", errors.New("No file extension")
	}
	return file[1], nil
}
