import { GridRowSelectionModel } from "@mui/x-data-grid"
import { create } from "zustand";;

type SelectedState = {
  value: GridRowSelectionModel
}

type SelectedAction = {
  setSelected: (value: GridRowSelectionModel) => void
}

const useSelectedStore = create<SelectedState & SelectedAction>(set => ({
  value: [],
  setSelected(value) {
    set({ value })
  }
}))

export default useSelectedStore
