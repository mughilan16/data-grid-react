package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = "5432"
	user     = "root"
	password = "secret"
	dbname   = "simple_bank"
)

func connectDB() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	return db
}

func AddItemToDB(item AddItemRequest) Item {
	db := connectDB()
	query := fmt.Sprintf("insert into items(name, value) VALUES('%s', '%s') returning id, name, value", item.Name, item.Value)
	row, err := db.Query(query)
	if err != nil {
		log.Panic(err)
	}
	newItem := new(Item)
	if row.Next() {
		err := row.Scan(&newItem.ID, &newItem.Name, &newItem.Value)
		if err != nil {
			fmt.Println(err)
		}
	}
	defer db.Close()
	err = db.Ping()
	if err != nil {
		log.Panic(err)
	}
	return *newItem
}

func GetItems() []Item {
	var items []Item
	db := connectDB()
	defer db.Close()
	query := fmt.Sprintf("select id, name, value from items")
	rows, err := db.Query(query)
	if err != nil {
		log.Println(err)
	}
	for rows.Next() {
		item := new(Item)
		err := rows.Scan(&item.ID, &item.Name, &item.Value)
		if err != nil {
			fmt.Println(err)
		}
		items = append(items, *item)
	}
	return items
}

func UpdateItemDB(item UpdateItemRequest) {
	db := connectDB()
	defer db.Close()
	query := fmt.Sprintf("update items set value=%s where id=%s", item.Value, item.ID)
	fmt.Println(query)
	_, err := db.Query(query)
	if err != nil {
		log.Println(err)
	}
}
