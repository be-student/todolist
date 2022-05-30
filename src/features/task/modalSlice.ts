import { createSlice } from "@reduxjs/toolkit";
import type { AppState } from "../../app/store";


const initialState = {
  id: 0,
  title: "",
  description: "",
  tag: [],
  complete: false,
  goalAt: new Date().valueOf(),
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {},
});

export const selectId=(state:AppState)=>state.modal.id;
export default modalSlice.reducer;