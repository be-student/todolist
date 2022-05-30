import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";

const initialState = {
  title: "tag1",
};
export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    clearFilter: (state) => {
      state.title = "";
    },
  },
});
export const { addFilter, clearFilter } = pageSlice.actions;
export const selectFilter = (state: AppState) => state.page.title;
export default pageSlice.reducer;
