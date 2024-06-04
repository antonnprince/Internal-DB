import React, { useEffect, useState } from 'react'
import {auth} from '../firebase.js'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
const [userDetails, setUserDetails] = useState({})
const {email} = useParams()
    useEffect(()=>{

      const fetchDetails =async(email)=>{
        try {
            const response = await axios.get(`http://localhost:5500/get_details/${email}`)
            console.log(response)
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

  return (
    <div>
      Profile
     {/* <h1>Welcome {userDetails}</h1>  */}
    </div>
  )
}

export default Profile