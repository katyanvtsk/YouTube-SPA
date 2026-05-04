import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import inputTextReducer from "./slices/inputText";
import videoReducer from "./slices/videoSlice";
import viewReducer from "./slices/viewSlice";
import savedReducer from "./slices/savedSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    text: inputTextReducer,
    video: videoReducer,
    view: viewReducer,
    favorites: savedReducer,
  },
});

export default store;
