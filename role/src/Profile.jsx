import React, { useEffect, useState } from 'react'
import {auth} from '../firebase.js'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
const [userDetails, setUserDetails] = useState([])
const {email} = useParams()
    useEffect(()=>{

      const fetchDetails =async(email)=>{
        try {
            const response = await axios.get(`http://localhost:5500/get_details/${email}`)
            setUserDetails(response.data)
        } catch (error) {
          console.log(error)
        }
      }

        auth.onAuthStateChanged((user)=>{
          if(user)
            { 
              const userEmail = user.email
              fetchDetails(userEmail)
            }
        })
       
    },[])

    const handleLogout= async()=>{
      try {
          await auth.signOut()
          console.log("User Signed out")
          window.location.href="/login"
           
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div>
      
    
       {
          userDetails.map((details)=>(
            <div key={details._id}>
            Currently logged in as {details.email}
            <h2>Welcome to</h2  >
            <h1>{details.department}</h1>
            </div>
          ))
        }

       <button className='bg-blue' onClick={handleLogout}>
        Logout
       </button>
    </div>
  )
}

export default Profile