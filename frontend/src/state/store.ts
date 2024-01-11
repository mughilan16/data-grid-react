import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./students/studentsSlice"
import selectedReducer from "./selected/selectedSlice"
import modalReducer from "./modal/modalSlice"
import messageSlice from "./message/messageSlice";

export const store = configureStore({
  reducer: {
    students: studentReducer, selected: selectedReducer, modal: modalReducer, message: messageSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

