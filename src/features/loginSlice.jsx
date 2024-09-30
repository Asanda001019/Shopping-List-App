// src/features/loginSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentUser: null,
  status: 'idle',
  error: null,
};

// Async thunk for registering a user
export const registerUser = createAsyncThunk('users/registerUser', async (newUser) => {
  const response = await fetch('http://localhost:5000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) {
    throw new Error('Failed to register user');
  }
  return response.json();
});

// Async thunk for logging in a user
export const loginUser = createAsyncThunk('users/loginUser', async ({ email, password }) => {
  const response = await fetch('http://localhost:5000/users');
  const users = await response.json();
  const foundUser = users.find(user => user.email === email && user.password === password);

  if (!foundUser) {
    throw new Error('Invalid credentials');
  }
  return foundUser;
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload); 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload; // Set the logged-in user
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
