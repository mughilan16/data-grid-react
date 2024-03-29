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

func connectDB() (*sql.DB, error) {
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		return nil, err
	}
	return db, nil
}

func ScanStudent(row *sql.Rows) (*Student, error) {
	student := new(Student)
	if row.Next() {
		err := row.Scan(&student.ID, &student.RRN, &student.Name, &student.Age, &student.Grade, &student.Place)
		if err != nil {
			return nil, err
		}
	}
	return student, nil
}

func AddStudentDB(studentDetails AddStudentRequest) (*Student, error) {
	db, err := connectDB()
	if err != nil {
		log.Println(err)
		return nil, err
	}
	query := fmt.Sprintf("insert into student(rrn, name, age, grade, place) VALUES(%d, '%s', %d, '%s', '%s') returning id, rrn, name, age, grade, place", studentDetails.RRN, studentDetails.Name, studentDetails.Age, studentDetails.Grade, studentDetails.Place)
	row, err := db.Query(query)
	if err != nil {
		log.Panic(err)
		return nil, err
	}
	newStudent, err := ScanStudent(row)
	if err != nil {
		log.Panic(err)
		return newStudent, err
	}
	defer db.Close()
	return newStudent, nil
}

func AddFileNameDB(id string, fileName string) (*FileName, error) {
	db, err := connectDB()
	if err != nil {
		log.Println(err)
		return nil, err
	}
	query := fmt.Sprintf("update student set filename='%s' where id=%s returning id, filename", fileName, id)
  rows, err := db.Query(query)
	if err != nil {
		log.Panic(err)
		return nil, err
	}
	filename := new(FileName)
  if rows.Next() {
		err := rows.Scan(&filename.ID, &filename.FileName)
		if err != nil {
			log.Println(err)
			return nil, err
		}
	} else {
    return nil, err
  }
	defer db.Close()
	return filename, nil
}

func GetStudents() ([]Student, error) {
	var students []Student
	db, err := connectDB()
	if err != nil {
		log.Println(err)
		return nil, err
	}
	defer db.Close()
	query := "select id, rrn, name, age, grade, place, filename from student"
	rows, err := db.Query(query)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	for rows.Next() {
		student := new(Student)
		err := rows.Scan(&student.ID, &student.RRN, &student.Name, &student.Age, &student.Grade, &student.Place, &student.FileName)
		if err != nil {
			log.Println(err)
			return nil, err
		}
		students = append(students, *student)
	}
	return students, nil
}

func UpdateStudentDB(student UpdateStudentRequest) (*Student, error) {
	db, err := connectDB()
	if err != nil {
		log.Println(err)
		return nil, err
	}
	defer db.Close()
	query := fmt.Sprintf("update student set rrn=%d, name='%s', age=%d, grade='%s', place='%s' where id=%d returning id, rrn, name, age, grade, place", student.RRN, student.Name, student.Age, student.Grade, student.Place, student.ID)
	row, err := db.Query(query)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	updatedStudent, err := ScanStudent(row)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	return updatedStudent, nil
}

func DeleteStudentDB(ids string) error {
	db, err := connectDB()
	if err != nil {
		log.Println(err)
		return err
	}
	defer db.Close()
	query := fmt.Sprintf("delete from student where id in (%s)", ids)
	fmt.Println(query)
	_, err = db.Query(query)
	if err != nil {
		log.Println(err)
		return err
	}
	return nil
}
