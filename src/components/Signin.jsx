import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'


const Signin = () => {

  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")


  const[loading,setLoading]=useState("")
  const[error,setError]=useState("")

  //create naviage function
  const navigate=useNavigate()


  const submit= async(e)=>{
    console.log("Sign up function")
    e.preventDefault()
    setLoading("Please wait while we are sign you in...")

    try {
      const data=new FormData
      data.append("email",email)
      data.append("password",password)
      //send data object to flask,server via endpoint
      //axios-->a library that allows us to send http requests.
      //await--.used in asynchronus function enabling to wait for response to reach before procceding with other line of code
      //response-->after sending a request, aresponce follows right after, It is stored in responce

      const response=await axios.post("https://kus-kus.alwaysdata.net/api/api/signin",data)
      console.log(response)
      setLoading("")
      //making decision based on responce from flask api
      if(response.data.user){
        //localstorage-->every website has it,it keeps credentials of logged in user and to be used in the website
        localStorage.setItem("user",JSON.stringify(response.data.user))
        console.log()
        //redirect to get products component
        navigate("/")
      }else{
        setError(response.data.message)
        //we can see the response from the browser console.
      }
      
    } catch (error) {
      setLoading("")
      setError(error.message)
      
    }


  }


  return (
    <div>
      <Navbar/>
      <div className='row mt-4 justify-content-center'>
      <div className='card shadow p-3 col-md-6 text-center
      form_deco '>
        <h2 className='text-center'>Welcome back,</h2>
        <h5 className='text-center'>Sign in</h5>
        <h5 className='text-info'>{loading}</h5>
        <h5 className='text-danger'>{error}</h5>
        <form onSubmit={submit}>
          <fieldset>
            
            <input type='email' placeholder="Enter your Email" className='form-control' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <br/>
            <br/>
            
            <input type="password" placeholder="Enter Password" className='form-control' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            {/* for user to actually be able to type in the input box,we need to put (onChange),so that a change in state is recognized and  value stored displayed  */}
            <br/>
            <br/>
            <button type="submit" className='btn btn-primary'>Sign In</button>
            <br/>
            <p className='text-center text-decoration:underline;'>Don't have an Account? Create one.. <Link to={"/signup"}>Sign Up</Link></p>
          </fieldset>
        </form>
      </div>

    </div><br />
    <Footer/>

    
    </div>
  )
}

export default Signin