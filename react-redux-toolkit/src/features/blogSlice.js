import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    counter: 0,
    blogList: [],
  },
  reducers: {
    inc: (state) => {
      state.counter += 1;
    },
    dec: (state) => {
      if (state.counter > 0) state.counter -= 1;
    },
    reset: (state) => {
      state.counter = 0;
    },
    incByTen: (state, action) => {
      state.counter += action.payload;
    },
    addBlog: (state, action) => {
      state.blogList.push(action.payload);
    },
  },
});

export const { inc, dec, reset, incByTen, addBlog } = blogSlice.actions;
export default blogSlice.reducer;
