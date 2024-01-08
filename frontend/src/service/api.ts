import axios from "axios"

const URL = "http://localhost:3001"
const axiosInstance = axios.create({baseURL: URL})
export type Student = {
  id: number,
  rrn: number,
  name: string,
  age: number,
  grade: "S" | "A" | "B" | "C" | "D" | "E" | "F",
  place: string,
}

export type addStudentRequest = {
  rrn: number,
  name: string,
  age: number,
  grade: "S" | "A" | "B" | "C" | "D" | "E" | "F",
  place: string,
}

type getItemResponse = {
  items : Array<Student>
}

export const addStudent = async (newItem: addStudentRequest) => {
  console.log(newItem)
  return ((await axiosInstance.post<Student>("/add-student", newItem)).data)
}

export const getStudents = async () => {
  return ((await axiosInstance.get<getItemResponse>("/get-students")).data)
}

export const updateStudent = async (updateItem: Student) => {
  return ((await axiosInstance.post<Student>("/update-student", updateItem)).data)
}

export const deleteStudents = async (ids: string) => {
  return (await axiosInstance.post("/delete-students", {ids: ids}))
}

export const uploadFile = async (formData : FormData) => {
  return (await axiosInstance.post('/upload-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }))
}