import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'



const Login = () => {
  const [email,setEmail] = useState("")
  const [pass,setPass] = useState("")

  const handleLogin=async(e)=>{
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
        <h2>Enter email</h2>
        <input type='email' onChange={(e)=>setEmail(e.target.value)}/>

        <h2>Enter Password</h2>
        <input type='password' onChange={(e)=>setPass(e.target.value)}/>

      <div className=''>
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