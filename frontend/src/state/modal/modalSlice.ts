import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type Modal = {
  type: "add" | "update" | "delete" | "detail" | "none"
  show: boolean
}

interface ModalState {
  value: Modal
}

const initialState: ModalState = {
  value: {
    show: false,
    type: "none"
  }
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<Modal>) => {
      state.value = action.payload
    },
    close: (state) => {
      state.value = {show: false, type: "none"}
    }
  }
})

export const {open, close} = modalSlice.actions;
export default modalSlice.reducer;
