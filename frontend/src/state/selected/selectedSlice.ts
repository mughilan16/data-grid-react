import { GridRowSelectionModel } from "@mui/x-data-grid"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedState {
  value: GridRowSelectionModel
}

const initialState: SelectedState = {
  value: []
}

const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers : {
    setSelected: (state, action: PayloadAction<GridRowSelectionModel>) => {
      state.value = action.payload
    }
  }
})

export const {setSelected} = selectedSlice.actions;
export default selectedSlice.reducer;
