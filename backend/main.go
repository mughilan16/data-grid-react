package main

import (
	"backend/util"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Student struct {
	ID       int    `json:"id"`
	RRN      int    `json:"rrn"`
	Name     string `json:"name"`
	Age      int    `json:"age"`
	Grade    string `json:"grade"`
	Place    string `json:"place"`
	FileName string `json:"fileName"`
}

type AddStudentRequest struct {
	RRN   int    `json:"rrn"`
	Name  string `json:"name"`
	Age   int    `json:"age"`
	Grade string `json:"grade"`
	Place string `json:"place"`
}

type UpdateStudentRequest struct {
	ID    int    `json:"id"`
	RRN   int    `json:"rrn"`
	Name  string `json:"name"`
	Age   int    `json:"age"`
	Grade string `json:"grade"`
	Place string `json:"place"`
}

type DeleteStudentsRequest struct {
	IDS string `json:"ids"`
}

type ErrorMessage struct {
	Message string `json:"message"`
}

type FileName struct {
	ID       int    `json:"id"`
	FileName string `json:"fileName"`
}

func main() {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{"*"},
		AllowMethods: []string{"*"},
	}))
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World")
	})

	e.Use(middleware.Static("./uploadedFiles/"))

	e.POST("/add-student", func(c echo.Context) error {
		var request AddStudentRequest
		c.Bind(&request)
		fmt.Println(request)
		isValid, err := validateAddFormData(request)
		if err != nil {
			return c.JSON(500, ErrorMessage{Message: "Error adding student details"})
		}
		if !isValid {
			return c.JSON(400, ErrorMessage{Message: "Missing Form Field"})
		}
		newItem, err := AddStudentDB(request)
		if err != nil {
			return c.JSON(500, ErrorMessage{Message: "Error adding student detail"})
		}
		return c.JSON(200, newItem)
	})
	e.GET("/get-students", func(c echo.Context) error {
		items, err := GetStudents()
		if err != nil {
			return c.JSON(500, ErrorMessage{Message: "Error adding student detail"})
		}
		var response = struct {
			Items []Student `json:"items"`
		}{
			Items: items,
		}
		return c.JSON(200, response)
	})
	e.POST("/update-student", func(c echo.Context) error {
		var request UpdateStudentRequest
		c.Bind(&request)
		if !validateUpdateFormData(request) {
			return c.JSON(500, ErrorMessage{Message: "Missing Form Fields"})
		}
		updatedItem, err := UpdateStudentDB(request)
		if err != nil {
			return c.JSON(500, ErrorMessage{Message: "Error adding student detail"})
		}
		return c.JSON(200, updatedItem)
	})
	e.POST("/delete-students", func(c echo.Context) error {
		var request DeleteStudentsRequest
		c.Bind(&request)
		fmt.Println(request)
		err := DeleteStudentDB(request.IDS)
		if err != nil {
			return c.JSON(500, ErrorMessage{Message: "Error adding student detail"})
		}
		return c.JSON(200, nil)
	})
	e.POST("/upload-file", func(c echo.Context) error {
		file, err := c.FormFile("file")
		id := c.FormValue("id")
		if err != nil {
			log.Println(err)
			return err
		}
		src, err := file.Open()
		if err != nil {
			log.Println(err)
			return err
		}
		defer src.Close()
		fmt.Println(file.Filename)
		fileExtension, err := util.GetFileExtension(file.Filename)
		if err != nil {
			log.Println(err)
			return err
		}
		fileName := id + "." + fileExtension
		dst, err := os.Create("./uploadedFiles/" + fileName)
		if err != nil {
			log.Println(err)
			return err
		}
		fmt.Println(dst.Name())
		defer dst.Close()
		if _, err = io.Copy(dst, src); err != nil {
			return err
		}
		res, err := AddFileNameDB(id, fileName)
		if err != nil {
			return err
		}
		return c.JSON(200, res)
	})
	e.Logger.Fatal(e.Start(":3001"))
}

func validateAddFormData(request AddStudentRequest) (bool, error) {
	students, err := GetStudents()
	if err != nil {
		return false, err
	}
	for _, student := range students {
		if student.RRN == request.RRN {
			return false, nil
		}
	}
	if request.Name == "" || request.Grade == "" || request.Place == "" {
		return false, nil
	}
	if request.RRN == 0 || request.Age == 0 {
		return false, nil
	}
	if request.Grade != "S" && request.Grade != "A" && request.Grade != "B" && request.Grade != "C" && request.Grade != "D" && request.Grade != "E" && request.Grade != "F" {
		return false, nil
	}
	return true, nil
}

func validateUpdateFormData(request UpdateStudentRequest) bool {
	if request.Name == "" || request.Place == "" {
		return false
	}
	if request.RRN == 0 || request.Age == 0 {
		return false
	}
	if request.Grade != "S" && request.Grade != "A" && request.Grade != "B" && request.Grade != "C" && request.Grade != "D" && request.Grade != "E" && request.Grade != "F" {
		return false
	}
	return true
}
