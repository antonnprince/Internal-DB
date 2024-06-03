import React from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <div>
      
      <button>
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