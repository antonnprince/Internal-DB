import { BrowserRouter as Router, Routes, Route,Navigate  } from 'react-router-dom'
import Login from "./Login"
import Register from './Register'
import Profile from './Profile'
import Admin from './Admin'
import './App.css'
import {auth} from '../firebase'
import { useState,useEffect } from 'react'
import Sales from './Sales'
import { SalesJM } from './SalesJM'

function App() {
  const [user,setUser]=useState()

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user)
    })
  },[])  


  return(
    <Router>
      <Routes>
        <Route path="/" index element={user? <Navigate to="/profile"/> : <Login/> }/>

        <Route path="/login" element={<Login/>} />

        <Route path="/register" element={<Register/>}/>

        <Route path='/profile' element={<Profile/> }/>
        
        <Route path='/admin' element={<Admin/>}/> 

        <Route path='/sales' element={<Sales/>}/>

        <Route path='/sales_jm' element={<SalesJM/>}/>
      
      </Routes>
    </Router>
  )
}

export default App
