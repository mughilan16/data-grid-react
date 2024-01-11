import { create } from "zustand"
import { GridRowSelectionModel } from "@mui/x-data-grid"
import { Student } from "../service/api"

export type Students = Array<Student>
export type ModalType = "add" | "update" | "delete" | "detail" | "none"
export type ModeType = "success" | "info" | "error"

type Modal = {
  type: ModalType
  show: boolean
}

type Message = {
  text: string
  mode: ModeType
  show: boolean
}

type State = {
  students: Students,
  selected: GridRowSelectionModel
  message: Message,
  modal: Modal,
}

type Action = {
  setStudents: (value: Students) => void
  addStudent: (value: Student) => void
  updateStudent: (value: Student) => void
  deleteStudent: (value: GridRowSelectionModel) => void
  addFile: (value: { fileName: string, id: number }) => void
  setSelected: (value: GridRowSelectionModel) => void
  showMessage: (value: {text: string, mode: ModeType}) => void,
  hideMessage: () => void
  openModal: (value: ModalType) => void
  closeModal: () => void
}

const useStore = create<State & Action>(set => ({
  students: [],
  selected: [],
  modal: {
    type: "none",
    show: false,
  },
  message: {
    mode: "success",
    show: false,
    text: ""
  },
  openModal(value) {
    set(prev => ({...prev, modal: {type: value, show: true}}))
  },
  closeModal() {
    set(prev => ({...prev, modal: {type: "none", show: false}}))
  },
  setStudents(value) {
    set(prev => ({ ...prev, students: value }))
  },
  addStudent(value) {
    set((prev) => ({...prev,students: [...prev.students, value] }))
  },
  updateStudent(value) {
    set(prev => ({...prev, students: prev.students.map(student => student.id === value.id ? { ...value, fileName: student.fileName } : student) }))
  },
  deleteStudent(value) {
    set(prev => ({...prev, students: prev.students.filter(student => !value.includes(student.id)) }))
  },
  addFile(value) {
    set(prev => ({ ...prev, students: prev.students.map(student => student.id === value.id ? { ...student, fileName: value.fileName } : student) }))
  },
  showMessage(value) {
    set(prev => ({...prev, message: {text: value.text, mode: value.mode, show: true}}))
  },
  hideMessage() {
    set(prev => ({...prev, message: {text: "", mode: "success", show: false}}))
  },
  setSelected(value) {
    set(prev => ({ ...prev, selected: value}))
  }
}))

export default useStore;
