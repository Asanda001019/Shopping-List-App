// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const initialState = {
//   lists: [],
//   status: 'idle',
//   error: null,
// };

// // Async thunk for fetching all lists
// export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
//   const response = await fetch('http://localhost:5000/lists');
//   if (!response.ok) {
//     throw new Error('Failed to fetch lists');
//   }
//   return response.json(); // Return the fetched lists
// });

// // Async thunk for adding a new list
// export const addList = createAsyncThunk('lists/addList', async (newList) => {
//   const response = await fetch('http://localhost:5000/lists', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newList),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to add list');
//   }

//   return response.json(); 
// });


// export const deleteList = createAsyncThunk('lists/deleteList', async (id) => {
//   await fetch(`http://localhost:5000/lists/${id}`, { method: 'DELETE' });
//   return id; 
// });

// export const updateList = createAsyncThunk('lists/updateList', async (updatedList) => {
//   const response = await fetch(`http://localhost:5000/lists/${updatedList.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(updatedList),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to update list');
//   }

//   return response.json(); 
// });

// const listSlice = createSlice({
//   name: 'lists',
//   initialState,
//   reducers: {
    
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLists.fulfilled, (state, action) => {
//         state.lists = action.payload; 
//       })
//       .addCase(addList.fulfilled, (state, action) => {
//         state.lists.push(action.payload); 
//       })
//       .addCase(deleteList.fulfilled, (state, action) => {
//         state.lists = state.lists.filter((list) => list.id !== action.payload); 
//       })
//       .addCase(updateList.fulfilled, (state, action) => {
//         const index = state.lists.findIndex((list) => list.id === action.payload.id);
//         if (index >= 0) {
//           state.lists[index] = action.payload; 
//         }
//       })
//       .addMatcher(
//         (action) => action.type.endsWith('/rejected'),
//         (state, action) => {
//           state.status = 'failed'; 
//           state.error = action.error.message; 
//         }
//       )
//       .addMatcher(
//         (action) => action.type.endsWith('/pending'),
//         (state) => {
//           state.status = 'loading'; 
//         }
//       );
//   },
// });

// export default listSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/lists'; // Use the correct port for your JSON server

export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const addList = createAsyncThunk('lists/addList', async (newList) => {
  const response = await axios.post(apiUrl, newList);
  return response.data;
});

export const updateList = createAsyncThunk('lists/updateList', async (updatedList) => {
  const response = await axios.put(`${apiUrl}/${updatedList.id}`, updatedList);
  return response.data;
});

export const deleteList = createAsyncThunk('lists/deleteList', async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
  return id; // Return the ID to remove it from the state
});

const listSlice = createSlice({
  name: 'lists',
  initialState: {
    lists: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.lists = action.payload;
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      })
      .addCase(updateList.fulfilled, (state, action) => {
        const index = state.lists.findIndex(list => list.id === action.payload.id);
        if (index !== -1) {
          state.lists[index] = action.payload; 
        }
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.lists = state.lists.filter(list => list.id !== action.payload); 
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.status = 'succeeded';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export default listSlice.reducer;
