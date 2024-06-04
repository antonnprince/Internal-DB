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
        <h1>Enter email</h1>
        <input type='email' onChange={(e)=>setEmail(e.target.value)}/>


        <h1>Enter Name</h1>
        <input type='text' onChange={(e)=>setName(e.target.value)}/>
        
        <h1>Enter Password</h1>
        <input type='password' onChange={(e)=>setPass(e.target.value)}/>

        <button onClick={handleRegister}>
            Submit
        </button>
    </div>
  )
}

export default Register