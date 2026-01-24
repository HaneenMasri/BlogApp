// src/store/blogSlice.js
import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    items: [],      
    isLoading: false, 
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setBlogs: (state, action) => {
      state.items = action.payload;
    },
addBlog: (state, action) => {
  const newBlog = {
    ...action.payload,
    id: Date.now(),
    image: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/600/400` 
  };

  state.items = [...state.items, newBlog]; 
  localStorage.setItem('blogs', JSON.stringify(state.items));
},

    updateBlog: (state, action) => {
      const index = state.items.findIndex(blog => blog.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        localStorage.setItem('blogs', JSON.stringify(state.items));
      }
    },

    deleteBlog: (state, action) => {
      state.items = state.items.filter(blog => blog.id !== action.payload);
      localStorage.setItem('blogs', JSON.stringify(state.items));
    },
  },
});

export const { addBlog, updateBlog, deleteBlog, setLoading, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;