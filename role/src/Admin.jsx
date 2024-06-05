import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Admin = () => {
    const [email, setEmail] = useState("")
    const [dep, setDep] = useState("")
    const [role, setRole]=useState("")
  return (
    <div>
        <h1>Welcome Admin</h1>

    </div>
  )
}

export default Admin