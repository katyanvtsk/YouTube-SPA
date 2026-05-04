import { createSlice } from "@reduxjs/toolkit";

const savedView = localStorage.getItem("view");

const initialState = {
  view: savedView ? savedView : "grid",
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  selectors: {
    selectView: (state) => state.view,
  },
  reducers: {
    setList: (state, action) => {
      state.view = action.payload;
    },
    setGrid: (state, action) => {
      state.view = action.payload;
    },
  },
});

export const { setList, setGrid } = viewSlice.actions;
export const { selectView } = viewSlice.selectors;
export default viewSlice.reducer;
