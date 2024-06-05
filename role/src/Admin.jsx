import React, { useState } from 'react'
import axios from 'axios'


const Admin = () => {
    const [email, setEmail] = useState("")
    const [dep, setDep] = useState("")
    //const [role, setRole]=useState("")

    const addUser =async(e)=>{
      
      e.preventDefault()
        
      const user = {
          email: email,
          department: dep
        }

        try {
          const res = await axios.post("http://localhost:5500/create_user", user)
          alert(res.data.message)
          setEmail("")
          setDep("")
        } catch (error) {
          console.log(error)
        }
    }
  return (
    <div>
        <h1>Welcome Admin</h1>
        
        <h2>Enter email of employee</h2>
        <input className='px-4 py-1 w-1/4' onChange={(e)=>setEmail(e.target.value)} value={email}/>
        
        <h2>Enter department of employee</h2>
        <input className='px-4 py-1 w-1/4' onChange={(e)=>setDep(e.target.value)} value={dep}/>
    
        <div className='mt-12'>
            <button className='p-4 mt-12' onClick={addUser}>
              Submit to Add Details
            </button>
        </div>

    </div>
  )
}

export default Admin