import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student } from "../../service/api";
import { GridRowSelectionModel } from "@mui/x-data-grid";

type Students = Array<Student>

interface StudentsState {
  value: Students
}

type updateFilePayload = {
  fileName: string,
  id: number
}

const initialState: StudentsState = {
  value: []
}

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Students>) => {
      state.value = action.payload
    },
    add: (state, action: PayloadAction<Student>) => {
      state.value = [...state.value, action.payload]
    },
    updateFile: (state, action: PayloadAction<updateFilePayload>) => {
      state.value = state.value.map(student => student.id === action.payload.id ? { ...student, fileName: action.payload.fileName } : student);
    },
    update: (state, action: PayloadAction<Student>) => {
      state.value = state.value.map(student => {
        if (student.id === action.payload.id) {
          console.log(student.id)
          return action.payload
        }
        return student
      })
    },
    remove: (state, action: PayloadAction<GridRowSelectionModel>) => {
      state.value = state.value.filter(student => !action.payload.includes(student.id))
    }
  }
})

export const { set, add, update, remove, updateFile } = studentsSlice.actions;
export default studentsSlice.reducer;
