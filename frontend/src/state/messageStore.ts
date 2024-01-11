import { create } from "zustand"

type ModeType = "success" | "info" | "error"

type Message = {
  text: string
  mode: ModeType
  show: boolean
}

type MessageState = {
  value: Message
}

type MessageAction = {
  show: (value: {text: string, mode: ModeType}) => void,
  hide: () => void
}


const useMessageStore = create<MessageState & MessageAction>(set => ({
  value: {
    text: "",
    show:false,
    mode: "success"
  },
  show(value) {
    set({value: {text: value.text, mode: value.mode, show: true}})
  },
  hide() {
    set({value: {text: "", mode: "success", show: false}})
  }
}))

export default useMessageStore
