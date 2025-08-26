import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

let API_URL = import.meta.env.VITE_API_URL;
let userId = localStorage.getItem("uId");

export const createTask = createAsyncThunk("/addTask", async (data) => {
  const newTask = { userId, ...data };
  await addDoc(collection(db, "taskList"), newTask);
  // console.log("test....................")
  return newTask;
});

export const viewTask = createAsyncThunk("/viewTask", async () => {
  const taskList = await getDocs(collection(db, "taskList"));
  let arr = [];
  console.log(taskList);
  taskList.forEach((task) => {
    const newTask = {
      id: task.id,
      ...task.data()
    };
    arr.push(newTask);
  });
  return arr;
});

export const deleteTask = createAsyncThunk("/deleteTask", async (id) => {
  await deleteDoc(doc(db, `taskList/${id}`));
  return id;
});

export const updateTask = createAsyncThunk("/updateTask", async (data) => {
  const { id } = data;
  await updateDoc(doc(db, `taskList/${id}`), data);
  return data;
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
