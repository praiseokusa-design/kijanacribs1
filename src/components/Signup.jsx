import axios from 'axios'
import React, { useState } from 'react'
import { Link, Links } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Signup = () => {

  //hook using (useState) that will be updated later in the program
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  //new const
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")

  //hook to store the error status
  const submit = async (e) => {
    // e.preventDefault-->prevents the webpage from reloading after submiting form content.
    //it helps prevent reseting of values stored in hooks

    //async-->enables the app to wait for sent response from server before executing the block of code.
    e.preventDefault()

    //we use them so tht only one applicable response is displayed depending on the situation(you cant have netwok error and succes at tsame time)
    setSuccess("")
    setLoading("")
    //updates the user that something is happeneing to the data they sent
    setLoading("Wait as you get registerd...")

    //try...catch-->incase there is an error,the app doesn't crash but shows the user the error caught.
    try {

      //prepare our data-->FormData
      //create FormData object which will allow the (key:value) pairs.

      const data = new FormData()
      //data-->is our object
      //append key:value pairs to our object(data)

      data.append("username", username)
      data.append("email", email)
      data.append("phone", phone)
      data.append("password", password)

      //-->whenever we make requests to a server,a response is a must,we store our response in this variable (response)

      //axios-->a libraty tht helps in making HTTP requests(post,patch,get,put,delete)to our api
      const respone = await axios.post("https://kus-kus.alwaysdata.net/api/api/signup", data)

      //this is for when the response has come back and it doesnt need to display ("loading")
      setLoading("")

      //-->catches the response from the server and stored in variable success and lastly displayed to user
      setSuccess(respone.data.message)

      //clear our hooks state after successful submission
      setUsername("")
      setEmail("")
      setPhone("")
      setPassword("")


    } catch (error) {

      //only allows one resonse to be displayed depending on the problem
      setSuccess("")
      setLoading("")
      setError(error.message)


    }

  }

  return (
    <div>
      <Navbar />
      <div className='row mt-4 justify-content-center'>
        <div className='card col-md-6 p-3 text-center form_deco'>
          <h2 className='text-'>First time user?</h2>
          <h2>Sign up</h2>
          {/* we bind these hooks to the user interface to keep the user inforemed of whts happening */}
          <h5 className='text-danger'>{error}</h5>
          {/* error-->incase there is an error it is displayed to user */}
          <h5 className='text-info'>{loading}</h5>
          <h5 className='text-success'>{success}</h5>
          <form onSubmit={submit} >
            <fieldset>
              {/* under (value)-we pass username ,for it to display what the variable hold in the input field*/}
              {/* we use (onChange)-this calls the function when the user changes the state in the input data type */}
              {/* e-->this is an event (it is also a parameter)*/}
              {/* e.target-->to target the specific element */}
              {/* value-->the value that changed will be taken and the function invoked and the state updated*/}

              <input type='text' placeholder='Enter Username'
                required className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} />
              <br>
              </br>
              <br></br>

              <input type="email" placeholder='Enter Email' required className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
              <br></br>
              <br></br>

              <input type='tel' placeholder='Enter Phone' required className='form-control' value={phone} onChange={(e) => setPhone(e.target.value)} />
              <br></br>
              <br></br>

              <input type="password" placeholder="Enter Password" required className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
              <br></br>
              <br></br>
              <button type='submit' className='btn btn-secondary' > Sign Up</button>
              




            </fieldset>
            <p>Already registered? <Link to={'/signin'}>Sign in</Link></p>
          </form>

        </div><br />

          <Footer/>
      </div>
    </div>
  )
}

export default Signup