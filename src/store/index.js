import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./notes";

const noteStore = configureStore({
  reducer: {
    note: noteSlice.reducer,
  },
});

export default noteStore;
