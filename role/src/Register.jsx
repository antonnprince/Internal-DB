import React from 'react'
import { useState } from 'react'
import { auth } from '../firebase.js'
import { createUserWithEmailAndPassword  } from 'firebase/auth'
// import {doc, setDoc} from "firebase/firestore"
import axios from 'axios'

const Register = () => {
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")
    const [name,setName]=useState("")

    const handleRegister= async(e)=>{
        e.preventDefault()
        try {
         await createUserWithEmailAndPassword(auth,email,pass)
        const user = auth.currentUser
       
        window.location.href="/profile"
            
        } catch (error) {
            console.log(error.message)
        }
        
        
    }

  return (
    <div>
        <h2>Enter email</h2>
        <input type='email' onChange={(e)=>setEmail(e.target.value)}/>


        <h2>Enter Name</h2>
        <input type='text' onChange={(e)=>setName(e.target.value)}/>
        
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