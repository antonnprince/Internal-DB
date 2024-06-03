import React, { useEffect, useState } from 'react'
import {auth} from '../firebase.js'
import { getDoc, doc } from 'firebase/firestore'

const Profile = () => {
const [userDetails, setUserDetails] = useState()

    useEffect(()=>{
        try {
                auth.onAuthStateChanged(async (user)=>{
                console.log(user)
                const docRef=doc(db,"Users",user.uid)
                const docSnap = await getDoc(docRef)
                if(docSnap.exists())
                    {
                        setUserDetails(docSnap.data())
                    }
            })
        } catch (error) {
            
        }
       
    },[])

  return (
    <div>Profile</div>
  )
}

export default Profile