import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
};

const inputTextSlice = createSlice({
  name: "text",
  initialState,
  selectors: {
    selectInputText: (state) => state.text,
  },
  reducers: {
    change: (state, action) => {
      state.text = action.payload;
    },
    clearInput: (state) => {
      state.text = "";
    },
  },
});

export const { change, clearInput } = inputTextSlice.actions;
export const { selectInputText } = inputTextSlice.selectors;
export default inputTextSlice.reducer;
