import { configureStore } from '@reduxjs/toolkit';
import listsReducer from "../features/listSlice"

const store = configureStore({
  reducer: {
    lists: listsReducer,
  },
});

export default store;
