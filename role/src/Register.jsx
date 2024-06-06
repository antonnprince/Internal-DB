import React from 'react'
import { useState } from 'react'
import { auth } from '../firebase.js'
import { createUserWithEmailAndPassword  } from 'firebase/auth'
// import {doc, setDoc} from "firebase/firestore"
import axios from 'axios'

const Register = () => {
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")
 
    const validate=async(email)=>{
    const res = await axios.get(`http://localhost:5500/get_details/${email}`)
    return res
  }


    const handleRegister=async(e)=>{
        e.preventDefault()
        try {
            const result = await validate(email)
             console.log("fetched email:",result.data[0].email)
             console.log("entered email:", email)
             const fetchEmail = result.data[0].email
            if(fetchEmail && fetchEmail===email) 
              {
                await createUserWithEmailAndPassword(auth,email,pass)
                const user = auth.currentUser
                window.location.href="/profile"
                //  window.location.href="/login"
              }
              else{
                alert("You are not authorized to access this webpage")
              }
        } catch (error) {
            console.log(error.message)
        }
        
        
    }

  return (
    <div>
        <h2>Enter email</h2>
        <input type='email' onChange={(e)=>setEmail(e.target.value)}/>
        
        <h2>Enter Password</h2>
        <input type='password' onChange={(e)=>setPass(e.target.value)}/>

        <div className=''>
            <button onClick={handleRegister}>
                Submit
            </button>
        </div>
    </div>
  )
}

export default Register