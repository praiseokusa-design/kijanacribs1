import axios from 'axios'
import React, { useState } from 'react'
//rfce
import { Form, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const MakePayment = () => {
    const [phone, setPhone] = useState()
    const [message, setMessage] = useState()
    const [error, setError] = useState()
    // we extract the state product that has been sent/passed to this component
    const { product } = useLocation().state || {} //-->>.state(is used to access the data from getproducts)
    console.log(product)
    const img_url = "https://kus-kus.alwaysdata.net/static/images/"

    const submit = async (e) => {
        e.preventDefault()
        setError()
        setMessage("Please wait as we process your payment")
        try {
            const data = new FormData
            //from mpesa_payment in insomnia
            data.append("phone", phone)
            data.append("amount", product.product_cost)

            const response = await axios.post("https://kus-kus.alwaysdata.net/api/mpesa_payment", data)
            console.log(response)
            setError("")
            setMessage(response.data.message)


        } catch (error) {
            setMessage("")
            setError(error.message)

        }
    }
    return (
        <div>
            <Navbar />
            <div className="row justify-content-center mt-3 text-center">
                <h1 className='text-success'>Lipa na M-pesa</h1>
                <div className="col-md-6 text-center ">
                    <div className="card shadow p-1">
                        <img src={img_url + product.product_photo} alt="" className='product_img mt-4 p-3' />
                        <div className="card-body">
                            <h5>Product name:{product.product_name} </h5>
                            <p className='text-muted'>Descritpion:{product.product_description}</p>
                            <p className='text-warning'>Cost :Ksh{product.product_cost}</p>
                            <form onSubmit={submit}>
                                <fieldset>
                                    <p>Phone that will make payment</p>
                                    <h5 className='text-success text-small'>{message}</h5>
                                    <h5 className='text-danger'>{error}</h5>
                                    <input type="tel" placeholder="254..." className='form-control' value={phone} required onChange={(e) => setPhone(e.target.value)} />
                                    <br />
                                    <button type='submit' className='btn btn-success'>Pay Now</button>


                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            <br/>
            <Footer/>
            
            
        </div>
    )
}

export default MakePayment



