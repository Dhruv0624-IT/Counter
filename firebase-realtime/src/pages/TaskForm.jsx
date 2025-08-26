import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createTask, updateTask } from '../features/taskSlice'
import { useNavigate, useParams } from 'react-router-dom'

const TaskForm = () => {
    const { register, handleSubmit, reset } = useForm()
    const {id} = useParams()
    const {taskList} = useSelector(state=>state)
    useEffect(()=>{
        if(id){
            const singleTask = taskList.find((task)=>{
                return task.id==id
            })
            reset(singleTask)
        }
        else{
            reset({
                category : "",
                date : "",
                description : ""
            })
        }
    },[id])
    const dispatch = useDispatch()
    const redirect = useNavigate()
    function task(data) {
        if(id==null){
            dispatch(createTask(data))
        }
        else{
            dispatch(updateTask(data))
        }
        redirect('/taskList')
    }
    return (
        <>
            <div className="col-lg-6 mx-auto my-5 p-5 shadow">
                <form onSubmit={handleSubmit(task)} method="post">
                    <div className="mt-4">
                        <label htmlFor="">Category</label>
                        <select {...register('category')} className='form-control'>
                            <option value="" selected disabled >---select task category---</option>
                            <option value="ToDo">ToDo</option>
                            <option value="Blog">Blog</option>
                            <option value="Portfolio">Portfolio</option>
                            <option value="E-Commerce">E-Commerce</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="">Due Date</label>
                        <input {...register('date')} type="date" className='form-control' />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="">Description</label>
                        <textarea {...register('description')} placeholder='Enter Task Description' className='form-control'></textarea>
                    </div>
                    <div className="mt-4">
                        {
                            id==null?
                            <button className='btn btn-success'>Submit</button>
                            :
                            <button className='btn btn-warning'>Update</button>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default TaskForm
