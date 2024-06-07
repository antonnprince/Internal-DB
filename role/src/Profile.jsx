import React, { useEffect, useState } from 'react'
import {auth} from '../firebase.js'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode' 

const Profile = () => {
const [userDetails, setUserDetails] = useState([])
const {email} = useParams()


const fetchDetails =async(email)=>{
  try {
      const response = await axios.get(`http://localhost:5500/get_details/${email}`)
      setUserDetails(response.data)
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  auth.onAuthStateChanged((user)=>{
    if(!user)
      {  
        window.location.replace('http://localhost:5173/login');
      }
      else{
          const token = localStorage.getItem('token')
           if(token)
            { 
              const user = jwtDecode(token)
              console.log(user)
              const userEmail = user.email
              fetchDetails(userEmail) 
            }
      }
  })
  window.addEventListener('beforeunload', handleLogout)
},[])



    const handleLogout= async()=>{
      try {
          await auth.signOut()
          window.location.href="/login"
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div>
    {
      userDetails ? (
        userDetails.map((details) => (
          <div key={details._id}>
            Currently logged in as {details.email}
            <h2>Welcome to</h2>
            <h1>{details.department}</h1>
            <h2>Role: {details.role}</h2>
            <button className='bg-blue' onClick={handleLogout}>
              Logout
            </button>
          </div>
        ))
      ) : (
        <h1>No user details available</h1>
      )
    }
  </div>
  )
}

export default Profile