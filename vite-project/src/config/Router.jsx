import React, { useEffect, useState } from 'react'
import App from '../App'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import {auth, onAuthStateChanged} from '../Services/firebase'
import Profile from '../pages/Profile'
import Upload from '../pages/Upload'
import ViewPost from '../pages/ViewPost'
import DashboardNav from '../Components/DashboardNav'
import Men from '../pages/Men'
import Women from '../pages/Women'
import { CartProvider } from '../Context/CartContext'
const Router = () => {

  const [user, setUser] = useState(false)

  useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    setUser(true)
  } else {
    setUser(false)
  }
});
  },[])
  


  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={!user? <Signup />: <Home /> } />
          <Route path='/profile' element={ <DashboardNav><Profile /></DashboardNav> } />
          <Route path='/upload' element={  <DashboardNav><Upload /></DashboardNav> } />
          <Route path='/viewpost' element={ <DashboardNav><ViewPost  /></DashboardNav> } />
          <Route path='/signup' element={user? <Home /> : <Signup />} />
          <Route path='/home' element={!user? <Login /> : <Home />} />
          <Route path='/login' element={user ? <Home/>  : <Login />} />
          <Route path='/men' element={<Men />} />
          <Route path='/women' element={<Women />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Router
