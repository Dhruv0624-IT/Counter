import {  signInWithEmailAndPassword } from "firebase/auth"
import { useForm } from "react-hook-form"
import {auth} from "../../firebase"
import { useNavigate } from "react-router-dom"

const SignIn = () => {
    const {register, handleSubmit} = useForm()
    const redirect = useNavigate()
    function regist(data){
        // console.log(data)
        signInWithEmailAndPassword(auth,data.email,data.password)
        .then(()=>{
          localStorage.setItem('uId',user?.uid)
            alert("Login Successfully!!")
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
                <button className="btn btn-success">Sign In</button>
            </div>
        </form>
      </div>
    </>
  )
}

export default SignIn
