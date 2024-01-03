import axios from "axios"

const URL = "http://localhost:3001"
const axiosInstance = axios.create({baseURL: URL})
export type Student = {
  id: string,
  rrn: string,
  name: string,
  age: string,
  grade: string,
  place: string,
}

export type addStudentRequest = {
  rrn: string,
  name: string,
  age: string,
  grade: string,
  place: string,
}

export const addStudent = async (newItem: addStudentRequest) => {
  return ((await axiosInstance.post<Student>("/add-student", newItem)).data)
}

type getItemResponse = {
  items : Array<Student>
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
