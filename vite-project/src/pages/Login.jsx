import React, { useImperativeHandle } from 'react'
import Loginform  from '../Components/loginform'
import '../Style/Login.css'
import { auth, signInWithEmailAndPassword } from '../Services/firebase'
import { Link } from 'react-router-dom'
const Login = () => {

  const loginUser = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
      console.log("Login Succesfully====>" + user)

  })
  .catch((error) => {
    console.log("Error====>>" + error)
  });

  }
  return (
    <div>

      <Loginform loginUser={loginUser} />
    </div>
  )
}

export default Login
