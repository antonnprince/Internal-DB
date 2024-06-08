import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'


const Admin = () => {
    const [email, setEmail] = useState("")
    const [dep, setDep] = useState("")
    const [role, setRole]=useState("")
    const[admin, setAdmin]=useState(false)
    const navigate = useNavigate()
    
    const handleLogout= async()=>{
      try {
          await auth.signOut()
          navigate("/login")
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user)
        {
            const token = localStorage.getItem('token')
            localStorage.removeItem('token')
            const decodedToken = jwtDecode(token)
            if(decodedToken.role==='admin' && decodedToken.department==='admin')
              setAdmin(true)
            else
             {
              setAdmin(false)
              navigate('/login')
             }
              
        }
        else
        {
            navigate('/login')
        }
    })
    window.addEventListener('beforeunload', handleLogout)
    // return () => window.removeEventListener('beforeunload', handleLogout);
  },[])

    const addUser = async (e) =>{
      e.preventDefault()   
      const user = {
          email: email,
          department: dep,
          role:role
        }
        try {
          const res = await axios.post("http://localhost:5500/create_user", user)
          alert(res.data.message)
          setEmail("")
          setDep("")
          setRole("")
        } catch (error) {
          alert(error)
          // console.log(error)
        }
    }

  
  return (
    <div>
      
      
      { admin?(
        <>
        <h1>Welcome Admin</h1>
        
        <h2>Enter email of employee</h2>
        <input className='px-4 py-1 w-1/4' onChange={(e)=>setEmail(e.target.value)} value={email}/>
        
        <h2>Enter department of employee</h2>
        <input className='px-4 py-1 w-1/4' onChange={(e)=>setDep(e.target.value)} value={dep}/>

        <h2>Enter role of employee</h2>
        <input className='px-4 py-1 w-1/4' onChange={(e)=>setRole(e.target.value)} value={role}/>

        <div className='mt-12'>
            <button className='p-4 mt-12' onClick={addUser}>
                Submit to Add Details
            </button>

            <button className='p-4' onClick={handleLogout}>
              Logout
            </button>
        </div>
        </>):(
          
            <h1>No access, go back!</h1>
          
        )
      }
       
      
        

    </div>
  )
}

export default Admin