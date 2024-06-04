import React, { useEffect, useState } from 'react'
import {auth} from '../firebase.js'
import axios from 'axios'
const Profile = () => {
const [userDetails, setUserDetails] = useState({})

    useEffect(()=>{
        try {
                 auth.onAuthStateChanged(async (user)=>{
                  const email = user.email
                  await axios.post("http://localhost:5500/get_details", {email:email}).
                  then((response)=>{console.log(response.data), setUserDetails(response)}).catch((error)=>console.log(error))
                 console.log(userDetails)
             })
        } catch (error) {
            console.log(error)
        }
       
    },[])

  return (
    <div>
      Profile
     {/* <h1>Welcome {userDetails}</h1>  */}
    </div>
  )
}

export default Profile