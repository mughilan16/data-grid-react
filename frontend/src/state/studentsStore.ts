import { Student } from "../service/api";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { create } from "zustand";

export type Students = Array<Student>

type StudentsState = {
  value: Students
}

type StudentsAction = {
  setStudents: (value: Students) => void
  addStudent: (value: Student) => void
  updateStudent: (value: Student) => void
  deleteStudent: (value: GridRowSelectionModel) => void
  addFile: (value: { fileName: string, id: number }) => void
}

const useStudentStore = create<StudentsState & StudentsAction>(set => ({
  value: [],
  setStudents(value) {
    set({ value: value })
  },
  addStudent(value) {
    set((prev) => ({ value: [...prev.value, value] }))
  },
  updateStudent(value) {
    set(prev => ({ value: prev.value.map(student => student.id === value.id ? { ...value, fileName: student.fileName } : student) }))
  },
  deleteStudent(value) {
    set(prev => ({ value: prev.value.filter(student => !value.includes(student.id)) }))
  },
  addFile(value) {
    set(prev => ({ value: prev.value.map(student => student.id === value.id ? { ...student, fileName: value.fileName } : student) }))
  }
}))

export default useStudentStore

