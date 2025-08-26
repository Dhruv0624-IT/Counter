import { createUserWithEmailAndPassword } from "firebase/auth"
import { useForm } from "react-hook-form"
import {auth} from "../../firebase"
import { NavLink, useNavigate } from "react-router-dom"

const Signup = () => {
    const {register, handleSubmit} = useForm()
    const redirect = useNavigate()
    function regist(data){
        console.log(data)
        createUserWithEmailAndPassword(auth,data.email,data.password)
        .then(()=>{
            alert("Registration Successfully!!")
            redirect("/taskForm")
        })
        .catch((err)=>console.log(err))
    }
  return (
    <>
      <div className="col-lg-6 mx-auto my-5 p-5 shadow">
        <form action="" method="post" onSubmit={handleSubmit(regist)}>
            <div className="mt-4">
                <input type="text" {...register("email")} className="form-control" placeholder="Enter Email-ID"/>
            </div>
            <div className="mt-4">
                <input type="password" {...register("password")} className="form-control" placeholder="Enter Password"/>
            </div>
            <div className="mt-4">
                <button className="btn btn-success">Sign up</button>
                <NavLink to="/signin" className="btn btn-warning mx-1">Login</NavLink>
            </div>
        </form>
      </div>
    </>
  )
}

export default Signup
