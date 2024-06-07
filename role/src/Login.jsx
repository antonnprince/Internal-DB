import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode' // Note: Remove the curly braces

const Login = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const auth = getAuth()
    try {
      await setPersistence(auth, browserSessionPersistence)
      await signInWithEmailAndPassword(auth, email, pass)
      const tokenResponse = await axios.post("http://localhost:5500/get_token", { email: email })
      const token = tokenResponse.data
      localStorage.setItem('token', token)

      const details = jwtDecode(token)
      if (details.role && details.department === "admin") {
        navigate('/admin')
      } else {
        navigate("/profile")
      }
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
      <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />

      <h2>Enter Password</h2>
      <input type='password' value={pass} onChange={(e) => setPass(e.target.value)} />

      <div>
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
