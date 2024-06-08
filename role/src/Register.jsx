import React from 'react'
import { useState } from 'react'
import { auth } from '../firebase.js'
import { createUserWithEmailAndPassword  } from 'firebase/auth'
import { useNavigate } from 'react-router-dom' 
import axios from 'axios'

const Register = () => {
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")

    const navigate=useNavigate()

    const validate=async(email)=>{
    const res = await axios.get(`http://localhost:5500/get_details/${email}`)
    console.log(res)
    return res.data
  }


    const handleRegister=async(e)=>{
        e.preventDefault()
        try {
            const result = await validate(email)  
            if(result)
            {  
              if(result==email) 
                {
                  await createUserWithEmailAndPassword(auth,email,pass)
                  const user = auth.currentUser
                  const tkn = await axios.post("http://localhost:5500/get_token",{email:email})
                    
                  if(tkn) 
                    navigate("/profile")
                }
                else
                {
                  alert("You are not authorized to access this webpage")
                  navigate('/login')
                }
            }
            
        } catch (error) {
            console.log(error)
        }
        
        
    }

  return (
    <div>
        <h2>Enter email</h2>
        <input type='email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
        
        <h2>Enter Password</h2>
        <input type='password' onChange={(e)=>setPass(e.target.value)} value={pass}/>

        <div className=''>
            <button onClick={handleRegister}>
                Submit
            </button>
        </div>
    </div>
  )
}

export default Register