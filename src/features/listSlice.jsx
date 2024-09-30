// // src/features/listSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  lists: [],
  status: 'idle',
  error: null,
};

// Async thunk for adding a new list
export const addList = createAsyncThunk('lists/addList', async (newList) => {
  const response = await fetch('http://localhost:5000/lists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newList),
  });

  if (!response.ok) {
    throw new Error('Failed to add list');
  }

  return response.json(); // Return the added list
});

const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    // You can add additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(addList.fulfilled, (state, action) => {
        state.lists.push(action.payload); // Add the new list to the state
      });
  },
});

export default listSlice.reducer;
