import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import postSlice from './postSlice.js'


const store = configureStore({
  reducer: {
    user: userSlice,
    post:postSlice
  },
});

export default store;