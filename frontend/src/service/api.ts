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
  fileName:string
}

export type updateStudentRequest = {
  id: number,
  rrn: number,
  name: string,
  age: number,
  grade: "S" | "A" | "B" | "C" | "D" | "E" | "F",
  place: string,
  file: FileList
}

export type addStudentRequest = {
  rrn: number,
  name: string,
  age: number,
  grade: "S" | "A" | "B" | "C" | "D" | "E" | "F",
  place: string,
  file: FileList
}

type getItemResponse = {
  items : Array<Student>
}

type FileNameResponse = {
  fileName: string,
  id: number
}

export const addStudent = async (newItem: addStudentRequest) => {
  console.log(newItem)
  return ((await axiosInstance.post<Student>("/add-student", newItem)).data)
}

export const getStudents = async () => {
  return ((await axiosInstance.get<getItemResponse>("/get-students")).data)
}

export const updateStudent = async (updateItem: updateStudentRequest) => {
  return ((await axiosInstance.post<Student>("/update-student", updateItem)).data)
}

export const deleteStudents = async (ids: string) => {
  return (await axiosInstance.post("/delete-students", {ids: ids}))
}

export const uploadFile = async (formData : FormData) => {
  return (await axiosInstance.post<FileNameResponse>('/upload-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })).data
}
