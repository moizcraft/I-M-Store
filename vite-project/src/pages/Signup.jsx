import React from 'react'
import Signupform  from '../Components/signupform'
import '../Style/Signup.css'
import { auth } from '../Services/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'



const Signup = () => {

    const registerUser = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.createpassword)
    .then((userCredential) => {
    
    const user = userCredential.user;
    console.log(user)
  })
  .catch((error) => {
    console.log(error)
  
  });
  }


  return (
    <div className='signup-page'>

      <Signupform registerUser={registerUser} />

    </div>
  )
}

export default Signup
