import axios from 'axios'
import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Addproducts = () => {
  const[product_name,setProduct_name]=useState("")
  const[product_description,setProduct_description]=useState("")
  const[product_cost,setProduct_cost]=useState("")
  const[product_photo,setProduct_photo]=useState("")
  const[amenities, setAmenities] = useState("")
  const[house_rules, setHouse_rules] = useState("")

  const[loading,setLoading]=useState("")
  const[error,setError]=useState("")
  const[success,setSuccess]=useState("")

  const submit=async(e)=>{
    e.preventDefault()
    setLoading("Please wait....")
    setError("")
    setSuccess("")

    try {
      const data=new FormData()
      data.append("product_name",product_name)
      data.append("product_description",product_description)
      data.append("product_cost",product_cost)
      data.append("product_photo",product_photo)
      data.append("amenities", amenities)
      data.append("house_rules", house_rules)

      const response=await axios.post("https://kus-kus.alwaysdata.net/api/add_product",data)
      // console.log(response)
      setLoading("")
      setSuccess(response.data.message)
    } catch (error) {
      setError(error.message)
      setLoading("")
      setSuccess("")
      console.log(error)
      
    }
  }
  return (
    <div>
        <Navbar/>
        <div className='row mt-5 justify-content-center'>
      <div className='card shadow col-md-6 text-center p-5 form_deco'>
        <h1>AddProduct</h1>
        <h6 className='text-info'>{loading}</h6>
        <h6 className='text-danger'>{error}</h6>
        <h6 className='text-success'>{success}</h6>
          <form onSubmit={submit}>
            
                <input type="text"placeholder='Enter product name' className='form-control' required value={product_name} onChange={(e)=>setProduct_name(e.target.value)}/> <br /> <br />
                
                <textarea placeholder='Describe your product' className='form-control' required value={product_description} onChange={(e)=>setProduct_description(e.target.value)} rows="3"></textarea> <br />

                <input type="text" placeholder='Amenities (e.g. WiFi, Hot Water, Parking)' className='form-control' value={amenities} onChange={(e)=>setAmenities(e.target.value)} /> <br />
                
                <input type="text" placeholder='House Rules (e.g. No Pets, Quiet Hours)' className='form-control' value={house_rules} onChange={(e)=>setHouse_rules(e.target.value)} /> <br />

                <input type="text" placeholder='Product cost' className='form-control' required value={product_cost} onChange={(e)=>setProduct_cost(e.target.value)} /> <br />
                <p className='text-center text-primary'>Browse/Upload Product Photo</p> 
                <input type="file" name='' id='' className='form-control' required accept='image/*' onChange={(e)=>setProduct_photo(e.target.files[0])}/>
                <br />
                <button type='submit' className='btn btn-primary text-center'> Upload folder</button>
              
            </form>
            </div>
        </div>
        <br/>
        <Footer/>
    </div>
  )
}

export default Addproducts