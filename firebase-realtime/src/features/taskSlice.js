import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import { get, push, ref, remove, set } from "firebase/database";
import {db} from "../../firebase"

let API_URL = import.meta.env.VITE_API_URL
let userId = localStorage.getItem('uId')

export const createTask = createAsyncThunk('/addTask', async (data) => {
    const newTask = {userId,...data}
    await set(push(ref(db,'/taskList'),newTask))
    return newTask
})

export const viewTask = createAsyncThunk('/viewTask', async () => {
    const result = await get(ref(db,'/taskList'))
    const obj = result.val()
    let arr = []
    for(var key in obj){
        const newTask = {
            id:key,
            ...obj[key]
        }
        arr.push(newTask)
    }
    return arr
})

export const deleteTask = createAsyncThunk('/deleteTask',async (id)=>{
    await remove(ref(db,`/taskList/${id}`))
    return id
})

export const updateTask = createAsyncThunk('/updateTask', async (data)=>{
    const {id} = data
    set(ref(db,`/taskList/${id}`),data)
    return data
})

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        taskList: []
    },
    reducers: {},
    extraReducers: (res) => {
        res
        .addCase(createTask.fulfilled, (state, action) => {
            state.taskList.push(action.payload)
        })
        .addCase(viewTask.fulfilled, (state, action)=>{
            state.taskList = action.payload
        })
        .addCase(deleteTask.fulfilled,(state,action)=>{
            const {id} = action.payload
            const filterData = state.taskList.filter((task)=>{
                return task.id !== id
            })
            state.taskList = filterData
        })
        .addCase(updateTask.fulfilled,(state,action)=>{
            const {id} = action.payload
            const index = state.taskList.findIndex((task)=>{
                return task.id == id
            })
            if(index!=-1){
                state.taskList[index] = action.payload
            }
        })
    }
})
export default taskSlice.reducer