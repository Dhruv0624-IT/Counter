import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import auth from "../../firebase"

const PrivateRoute = () => {
    const [users,setUser] = useState({})
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            setUser(user)
        })
    },[])
  return users == null ? <Navigate to='/signin'/> : <Outlet/>
}

export default PrivateRoute
