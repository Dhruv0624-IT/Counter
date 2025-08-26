import { FaEye, FaTrash } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'

const CardUi = ({category,date,description,trash,id}) => {
  return (
    <>
      <div className="card border-0 shadow">
        <div className="card-body">
            <h3>{category}</h3>
            <p>{date}</p>
            <p>{description}</p>
            <button onClick={trash} className='btn btn-danger'><FaTrash/></button>
            <NavLink to={`/taskItem/${id}`} className='btn mx-1 btn-primary'><FaEye/></NavLink>
            <NavLink to={`/updateTask/${id}`} className='btn mx-1 btn-warning'><FaPencil/></NavLink>
        </div>
      </div>
    </>
  )
}

export default CardUi
