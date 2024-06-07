import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [email,setEmail] = useState("")
  const [pass,setPass] = useState("")
  const navigate = useNavigate()
  
  
  const handleLogin=async(e)=>{
    e.preventDefault()
    try {
          await signInWithEmailAndPassword(auth,email,pass)
          const token = await axios.post("http://localhost:5500/get_token",{email:email})
          localStorage.setItem('token',token.data)
          
          const details = jwtDecode(token.data)
          if(details.role && details.department==="admin")
            navigate('/admin')
          else
          navigate("/profile")

    } catch (error) {
      console.log(error)
      alert("Register first before logging in")
      setEmail("")
      setPass("")
    }
  }

  return (
    <div>
        <h2>Enter email</h2>
        <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <h2>Enter Password</h2>
        <input type='password' value={pass} onChange={(e)=>setPass(e.target.value)}/>

        <div className>
              <button onClick={handleLogin} className='m-4'>
                Login
              </button>

              <button>
                <Link to="/register">
                Register
                </Link>
              </button>
        </div>
    </div>
  )
}

export default Login

