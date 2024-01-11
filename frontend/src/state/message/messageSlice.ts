import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type Message = {
  text: string
  mode: "success" | "info" | "error"
  show: boolean
}

interface MessageState {
  value: Message
}

const initialState: MessageState = {
  value: {
    text: "",
    mode: "success",
    show: false
  }
}

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    show: (state, action: PayloadAction<{text: string, mode: "success" | "info" | "error"}>) => {
      state.value = {
        text: action.payload.text,
        mode: action.payload.mode,
        show: true
      }
    }, 
    hide: (state) => {
      state.value = {
        text: "",
        mode: "success",
        show: false
      }
    }
  }
})

export const {show, hide} = messageSlice.actions;
export default messageSlice.reducer;
