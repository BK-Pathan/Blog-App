// store/postSlice.js
import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    setPosts: (state, action) => {
      state.items = action.payload;
    },
    addPost: (state, action) => {
      state.items.push(action.payload);
    },
    clearPosts: (state) => {
      state.items = [];
    },
  },
});

export const { setPosts, addPost, clearPosts } = postSlice.actions;
export default postSlice.reducer;
