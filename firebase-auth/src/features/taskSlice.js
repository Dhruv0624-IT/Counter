import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let API_URL = import.meta.env.VITE_API_URL;
let userId = localStorage.getItem("uId");

export const createTask = createAsyncThunk("/addTask", async (data) => {
  return await axios
    .post(`${API_URL}/tasks`, { userId, ...data })
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const viewTask = createAsyncThunk("/viewTask", async () => {
  return await axios
    .get(`${API_URL}/tasks`)
    .then((res) => {
      return res.data.filter((task) => {
        return task.userId == userId;
      });
    })
    .catch((err) => console.log(err));
});

export const deleteTask = createAsyncThunk("/deleteTask", async (id) => {
  return await axios
    .delete(`${API_URL}/tasks/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err))
});

export const updateTask = createAsyncThunk("/updateTask", async (data) => {
  const { id } = data;
  return await axios
    .put(`${API_URL}/tasks/${id}`, data)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

const taskSlice = createSlice({
  name: "task",
  initialState: {
    taskList: [],
  },
  reducers: {},
  extraReducers: (res) => {
    res
      .addCase(createTask.fulfilled, (state, action) => {
        state.taskList.push(action.payload);
      })
      .addCase(viewTask.fulfilled, (state, action) => {
        state.taskList = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { id } = action.payload;
        const filterData = state.taskList.filter((task) => {
          return task.id !== id;
        });
        state.taskList = filterData;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { id } = action.payload;
        const index = state.taskList.findIndex((task) => {
          return task.id == id;
        });
        if (index != -1) {
          state.taskList[index] = action.payload;
        }
      });
  },
});

export default taskSlice.reducer;
