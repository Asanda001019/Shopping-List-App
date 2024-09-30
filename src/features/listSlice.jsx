import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  lists: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching all lists
export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
  const response = await fetch('http://localhost:5000/lists');
  if (!response.ok) {
    throw new Error('Failed to fetch lists');
  }
  return response.json(); // Return the fetched lists
});

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

// Async thunk for deleting a list
export const deleteList = createAsyncThunk('lists/deleteList', async (id) => {
  await fetch(`http://localhost:5000/lists/${id}`, { method: 'DELETE' });
  return id; // Return the id of the deleted list
});

// Async thunk for updating a list
export const updateList = createAsyncThunk('lists/updateList', async (updatedList) => {
  const response = await fetch(`http://localhost:5000/lists/${updatedList.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedList),
  });

  if (!response.ok) {
    throw new Error('Failed to update list');
  }

  return response.json(); // Return the updated list
});

const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    // You can add additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.lists = action.payload; // Update state with fetched lists
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.lists.push(action.payload); // Add the new list to the state
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.lists = state.lists.filter((list) => list.id !== action.payload); // Remove the deleted list from the state
      })
      .addCase(updateList.fulfilled, (state, action) => {
        const index = state.lists.findIndex((list) => list.id === action.payload.id);
        if (index >= 0) {
          state.lists[index] = action.payload; // Update the list in the state
        }
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed'; // Set status to failed on any rejected action
          state.error = action.error.message; // Capture the error message
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading'; // Set status to loading on any pending action
        }
      );
  },
});

export default listSlice.reducer;
