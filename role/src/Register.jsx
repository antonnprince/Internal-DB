import React from 'react'
import { auth,db } from '../firebase.js'
import { createUserWithEmailAndPassword  } from 'firebase/auth'
import {doc, setDoc} from "firebase/firestore"
import axios from 'axios'

const Register = () => {
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")
    const [name,setName]=useState("")

    const handleRegister= async(e)=>{
        e.preventDefault()
        console.log(email,name,pass)
        try {
         await createUserWithEmailAndPassword(auth,email,pass)
        const user = auth.currentUser
        //console.log(user)
        window.location.href="/profile"
        if(user)
            {
                try {
                    axios.post('localhost:5500')
                } catch (error) {
                    console.log(error)
                }
            }

            
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