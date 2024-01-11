import { create } from "zustand";

type StudentsState = {
  value: Students
}

const useStudentStore = create<StudentsState & StudentsAction>(set => ({
}))

export default useStudentStore

