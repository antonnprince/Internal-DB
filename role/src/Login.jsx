import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
const Login = () => {
  const [email,setEmail] = useState("")
  const [pass,setPass] = useState("")

  const handleLogin= async(e)=>{
    e.preventDefault()
    try {
      
      await signInWithEmailAndPassword(auth,email,pass)
      window.location.href="/profile"

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
        <h1>Enter email</h1>
        <input type='email' onChange={(e)=>setEmail(e.target.value)}/>

        <h1>Enter Password</h1>
        <input type='password' onChange={(e)=>setPass(e.target.value)}/>

      <button onClick={handleLogin}>
        Login
      </button>

      <button>
        <Link to="/register">
        Register
        </Link>
      </button>
    </div>
  )
}

export default Login