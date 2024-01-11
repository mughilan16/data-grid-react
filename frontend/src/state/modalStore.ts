import { create } from "zustand"

export type ModalType = "add" | "update" | "delete" | "detail" | "none"

type Modal = {
  type: ModalType
  show: boolean
}

type ModalState = {
  value: Modal
}

type ModalAction = {
  open: (value: ModalType) => void
  close: () => void
}

const useModalStore = create<ModalState & ModalAction>(set => ({
  value: {
    type: "none",
    show: false,
  },
  open(value) {
    set({value: {type: value, show: true}})
  },
  close() {
    set({value: {type: "none", show: false}})
  }
}))

export default useModalStore
