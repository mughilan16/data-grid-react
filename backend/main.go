package main

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Item struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Value string `json:"value"`
}
type AddItemRequest struct {
	Name  string `json:"name"`
	Value string `json:"value"`
}

type UpdateItemRequest struct {
	ID    string `json:"id"`
	Value string `json:"updatedValue"`
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

	e.POST("/add-item", func(c echo.Context) error {
		var request AddItemRequest
		c.Bind(&request)
		fmt.Println(request)
		newItem := AddItemToDB(request)
		return c.JSON(200, newItem)
	})
	e.GET("/get-items", func(c echo.Context) error {
		items := GetItems()
		var response = struct {
			Items []Item `json:"items"`
		}{
			Items: items,
		}
		return c.JSON(200, response)
	})
	e.POST("/update-item", func(c echo.Context) error {
		var request UpdateItemRequest
		c.Bind(&request)
		UpdateItemDB(request)
		return c.JSON(200, request)
	})
	e.Logger.Fatal(e.Start(":3001"))
}
