// src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  users: [],
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

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload); // Add the new user to the users array
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
