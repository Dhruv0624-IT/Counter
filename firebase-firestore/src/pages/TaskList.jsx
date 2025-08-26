import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, viewTask } from '../features/taskSlice'
import CardUi from '../layout/CardUi'
import { useNavigate } from 'react-router-dom'

const TaskList = () => {
    const { taskList } = useSelector(state => state)
    const [search,setSearch] = useState("")
    const [selectCat,setCategory] = useState("")
    const [sorting,setSort] = useState("")
    // console.log(taskList)
    const dispatch = useDispatch()
    const redirect = useNavigate()
    useEffect(() => {
        dispatch(viewTask())
    }, [])
    function trash(id){
        if(confirm("Do tou want to delete this task?")){
            dispatch(deleteTask(id))
            dispatch(viewTask())
        }
    }
    const filterData = taskList
    .filter((task)=>{
        return task.category.toLowerCase().includes(search.toLowerCase())
    })
    .filter((task)=>{
        return task.category.includes(selectCat)
    })
    .sort((a,b)=>{
        if(sorting=="date"){
            return b.date.localeCompare(a.date)
        }
        else if(sorting=="asc"){
            return a.category.localeCompare(b.category)
        }
        else if(sorting=="desc"){
            return b.category.localeCompare(a.category)
        }
    })
    let category = taskList.map((task)=>{
        return task.category
    })
    category = new Set(category)
    return (
        <>
            <div className="container p-2">
                <form action="">
                    <div className="row">
                    <div className="col-lg-4 my-4">
                        <input type="text" className='form-control' onChange={(e)=>setSearch(e.target.value)} placeholder='Enter Product Category'/>
                    </div>
                    <div className="col-lg-4 my-4">
                        <select className='form-select' onChange={(e)=>setCategory(e.target.value)}>
                            <option value="" disabled selected>--select category--</option>
                            {
                                [...category].map((cat)=>(
                                    <option key={cat} value={cat}>{cat}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-lg-4 my-4">
                        <select className='form-select' value={sorting} onChange={(e)=>setSort(e.target.value)}>
                            <option value="" disabled selected>--select category--</option>
                            <option value="date">Modify Date</option>
                            <option value="asc">A to Z(category)</option>
                            <option value="desc">Z to A(category)</option>
                        </select>
                    </div>
                </div>
                </form>
                    <button className='btn mt-1 btn-success' onClick={() => redirect(-1)}>Back</button>
                <div className="row">
                    {
                        filterData && filterData.map((task, index) => {
                            return (
                                <div key={index} className="col-xl-3 col-md-6 mt-4 col-lg-4">
                                    <CardUi category={task.category} date={task.date} description={task.description} trash={()=>trash(task.id)} id={task.id}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default TaskList
