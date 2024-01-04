package main

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Student struct {
	ID    string `json:"id"`
	RRN   string `json:"rrn"`
	Name  string `json:"name"`
	Age   string `json:"age"`
	Grade string `json:"grade"`
	Place string `json:"place"`
}

type AddStudentRequest struct {
	RRN   string `json:"rrn"`
	Name  string `json:"name"`
	Age   string `json:"age"`
	Grade string `json:"grade"`
	Place string `json:"place"`
}

type UpdateStudentRequest struct {
	ID    string `json:"id"`
	RRN   string `json:"rrn"`
	Name  string `json:"name"`
	Age   string `json:"age"`
	Grade string `json:"grade"`
	Place string `json:"place"`
}

type DeleteStudentsRequest struct {
	IDS string `json:"ids"`
}

type ErrorMessage struct {
	message string `json:"message"`
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

	e.POST("/add-student", func(c echo.Context) error {
		var request AddStudentRequest
		c.Bind(&request)
		fmt.Println(request)
		newItem, err := AddStudentDB(request)
		if err != nil {
			return c.JSON(500, "Error adding student detail")
		}
		return c.JSON(200, newItem)
	})
	e.GET("/get-students", func(c echo.Context) error {
		items := GetStudents()
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
		updatedItem := UpdateStudentDB(request)
		return c.JSON(200, updatedItem)
	})
	e.POST("/delete-students", func(c echo.Context) error {
		var request DeleteStudentsRequest
		c.Bind(&request)
		fmt.Println(request)
		DeleteStudentDB(request.IDS)
		return c.JSON(200, nil)
	})
	e.Logger.Fatal(e.Start(":3001"))
}
