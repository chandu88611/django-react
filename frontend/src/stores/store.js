import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import loaderSlice from "./loaderSlice";
import alertSlice from "./alertSlice";
import orderSlice from "./orderSlice";


export const store = configureStore({
  reducer: {
    users:userSlice,
    alert:alertSlice,
    loader:loaderSlice,
    order:orderSlice
  },
});


