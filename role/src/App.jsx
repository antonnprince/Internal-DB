import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./Login"
import Register from './Register'
import Profile from './Profile'
import Admin from './Admin'
import './App.css'


function App() {
  return(
    <Router>
      <Routes>

        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>

        <Route path='/admin' element={<Admin/>}/> 
      
      </Routes>
    </Router>
  )
}

export default App
