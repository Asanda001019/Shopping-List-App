// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import listsReducer from '../features/listSlice';
import userReducer from '../features/userSlice'; // Import the user slice
import loginReducer from "../features/loginSlice"

const store = configureStore({
  reducer: {
    lists: listsReducer,
    users: userReducer,
    login: loginReducer,
    
  },
});

export default store;
