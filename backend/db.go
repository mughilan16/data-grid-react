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

func ScanStudent(row *sql.Rows) Student {
	student := new(Student)
	if row.Next() {
		err := row.Scan(&student.ID, &student.RRN, &student.Name, &student.Age, &student.Grade, &student.Place)
		if err != nil {
			fmt.Println(err)
		}
	}
	return *student
}

func AddStudentDB(studentDetails AddStudentRequest) Student {
	db := connectDB()
	query := fmt.Sprintf("insert into student(rrn, name, age, grade, place) VALUES('%s', '%s', '%s', '%s', '%s') returning id, rrn, name, age, grade, place", studentDetails.RRN, studentDetails.Name, studentDetails.Age, studentDetails.Grade, studentDetails.Place)
	row, err := db.Query(query)
	if err != nil {
		log.Panic(err)
	}
	newStudent := ScanStudent(row)
	defer db.Close()
	return newStudent
}

func GetStudents() []Student {
	var students []Student
	db := connectDB()
	defer db.Close()
	query := "select id, rrn, name, age, grade, place from student"
	rows, err := db.Query(query)
	if err != nil {
		log.Println(err)
	}
	for rows.Next() {
		student := new(Student)
		err := rows.Scan(&student.ID, &student.RRN, &student.Name, &student.Age, &student.Grade, &student.Place)
		if err != nil {
			fmt.Println(err)
		}
		students = append(students, *student)
	}
	return students
}

func UpdateStudentDB(student UpdateStudentRequest) Student {
	db := connectDB()
	defer db.Close()
	query := fmt.Sprintf("update student set rrn='%s', name='%s', age='%s', grade='%s', place='%s' where id=%s returning id, rrn, name, age, grade, place", student.RRN, student.Name, student.Age, student.Grade, student.Place, student.ID)
	row, err := db.Query(query)
	if err != nil {
		log.Println(err)
	}
	updatedStudent := ScanStudent(row)
	return updatedStudent
}

func DeleteStudentDB(ids string) error {
	db := connectDB()
	defer db.Close()
	query := fmt.Sprintf("delete from student where id in (%s)", ids)
	fmt.Println(query)
	_, err := db.Query(query)
	if err != nil {
		log.Println(err)
		return err
	}
	return nil
}
