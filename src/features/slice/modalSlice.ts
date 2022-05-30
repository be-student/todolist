import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../app/store";


const initialState = {
  id: 0,
  modal:false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number>) => {
      state.id=action.payload;
    },
    clearId:(state)=>{
      state.id=0;
    },
    setModal :(state,action: PayloadAction<boolean>)=>{
      state.modal=action.payload;
    }
  },
});

export const {setId,clearId,setModal}=modalSlice.actions;
export const selectId=(state:AppState)=>state.modal.id;
export const selectModal=(state:AppState)=>state.modal.modal;
export default modalSlice.reducer;