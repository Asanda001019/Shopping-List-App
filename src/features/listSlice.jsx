import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  lists: [],
  status: 'idle',
};

export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
  const response = await fetch('http://localhost:5000/lists');
  return response.json();
});

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action) => {
      state.lists.push(action.payload);
    },
    // other reducers can be added here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.lists = action.payload;
      });
  },
});

export const { addList } = listsSlice.actions;
export default listsSlice.reducer;
