import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewTask } from '../features/taskSlice'
import { useParams } from 'react-router-dom'

const TaskItem = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(viewTask(id))
  }, [])
  const {taskList} = useSelector(state=>state)
  const singleTask = taskList.find((task)=>{
    return task.id===id
  })
  console.log(singleTask)
  return (
    <>
        <div className="mt-5 mx-auto my-5 p-5 shadow card border-0 w-75 h-75">
          <div className="card-body">
            <p><strong>Date : </strong>{singleTask.date}</p>
            <h1><strong>Category : </strong>{singleTask.category}</h1>
            <p><strong>Description : </strong>{singleTask.description}</p>
          </div>
        </div>
    </>
  )
}

export default TaskItem
