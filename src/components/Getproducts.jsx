import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'



const Getproducts = () => {
  const [products, setProducts] = useState([])// empty array
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const img_url = "https://kus-kus.alwaysdata.net/static/images/"

  const getProducts = async () => {
    setLoading("Wait as we load products...")
    try {
      const response = await axios.get("https://kus-kus.alwaysdata.net/api/get_product_details")
      console.log(response)
      setLoading("")
      setProducts(response.data)

    } catch (error) {
      setLoading("")
      setError(error.message)


    }
  }
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div>
      <Navbar />
      
      <div>
         <div className='row'>
         <div class="col-md-12">
                <div class="carousel slide" data-bs-ride="carousel" id="mycarousel">
                    
                    <div class="carousel-inner">
                        
                        <div class="carousel-item active">
                            <img src="/images/carosel1.png" alt="slide 1" className="d-block carousel_img"/>
                        </div>
                        <div class="carousel-item">
                            <img src="/images/carosel2.png" alt="Slide 2" className="d-block carousel_img"/>
                        </div>
                        {/* <div class="carousel-item">
                            <img src="/images/.jpeg" alt="Slide 2" className="d-block carousel_img"/>
                        </div> */}
                       

                    </div>
                   
                    <a href="#mycarousel" data-bs-slide="prev" class="carousel-control-prev ">
                        <span class="carousel-control-prev-icon bg-danger"></span>
                    </a>
                    <a href="#mycarousel" data-bs-slide="next" class="carousel-control-next">
                        <span class="carousel-control-next-icon bg-danger"></span>
                    </a>
                </div>

            </div><br/>


    </div>
        
        
      </div>
      <div className='row mt-4 container-fluid'>
        <h1 className='mt-3 text-primary text-center'>Tafuta Crib</h1>
        <h5 className='text-info'>{loading}</h5>
        <h5 className='text-danger'>{error}</h5>

        {/* map over products and display them*/}
        {products.map((product) => (
          <div className='justify-content-center col-md-3'>
            <div className='card shadow p-4 text-center mb-4 card-margin form_deco'>
              <img src={img_url + product.product_photo} alt="" className='product_img mt-2' />
              <div className='card-body'>
                <h5 className='mt-2'>{product.product_name}</h5>
                <p className='text-muted'>{product.product_description}</p>
                <h5 className='text-success mb-3'>ksh:{product.product_cost}</h5>
                <button className='btn btn-danger' onClick={() => navigate("/makepayment", { state: { product } })}>Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
        
        <div>
          <div>
            <img src="/images/graph.png" alt="statusgraph" /><br />
          </div>
        </div>

      <Footer/>
      
      

    </div>
  )
}

export default Getproducts
