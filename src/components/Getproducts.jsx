import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { Chatbot } from './Chatbot'
import { PropertyMap } from './PropertyMap'



const Getproducts = () => {
  const [products, setProducts] = useState([])// empty array
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const [visibleCount, setVisibleCount] = useState(4)
  const navigate = useNavigate()

  // Wishlist Logic
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleWishlist = (product) => {
    const isId = product.id || product.product_name;
    const updatedWishlist = wishlist.includes(isId) 
      ? wishlist.filter(id => id !== isId) 
      : [...wishlist, isId];
    
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '{"items": []}');
    // Use product_name as fallback ID if unique ID is not provided by the API
    const productId = product.id || product.product_name;
    
    if (!existingCart.items.some(item => item.id === productId)) {
      existingCart.items.push({
        id: String(productId),
        name: product.product_name,
        price: Number(product.product_cost)
      });
      localStorage.setItem('cart', JSON.stringify(existingCart));
      alert(`${product.product_name} added to cart!`);
    } else {
      alert("This crib is already in your cart.");
    }
  };

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
         <div className="col-md-12">
                <div className="carousel slide" data-bs-ride="carousel" id="mycarousel">
                    
                    <div className="carousel-inner">
                        
                        <div className="carousel-item active">
                            <img src="/images/carosel1.png" alt="slide 1" className="d-block carousel_img"/>
                        </div>
                        <div className="carousel-item">
                            <img src="/images/carosel2.png" alt="Slide 2" className="d-block carousel_img"/>
                        </div>
                        {/* <div className="carousel-item">
                            <img src="/images/.jpeg" alt="Slide 2" className="d-block carousel_img"/>
                        </div> */}
                       

                    </div>
                   
                    <a href="#mycarousel" data-bs-slide="prev" className="carousel-control-prev ">
                        <span className="carousel-control-prev-icon bg-danger"></span>
                    </a>
                    <a href="#mycarousel" data-bs-slide="next" className="carousel-control-next">
                        <span className="carousel-control-next-icon bg-danger"></span>
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
        {products.slice(0, visibleCount).map((product) => (
          <div className='justify-content-center col-md-3' key={product.id || product.product_name}>
            <div className='card shadow p-4 text-center mb-4 card-margin form_deco'>
              <button 
                className={`btn btn-sm position-absolute top-0 end-0 m-2 ${wishlist.includes(product.id || product.product_name) ? 'text-danger' : 'text-muted'}`}
                onClick={() => toggleWishlist(product)}>
                {wishlist.includes(product.id || product.product_name) ? '❤️' : '🤍'}
              </button>
              <img src={img_url + product.product_photo} alt="" className='product_img mt-2' />
              <div className='card-body'>
                <h5 className='mt-2'>{product.product_name}</h5>
                <p className='text-muted'>{product.product_description}</p>
                <h5 className='text-success mb-3'>ksh:{product.product_cost}</h5>
                <div className="d-flex justify-content-center gap-2">
                  <button className='btn btn-danger btn-sm' onClick={() => navigate("/makepayment", { state: { product } })}>
                    Buy Now
                  </button>
                  <button className='btn btn-outline-primary btn-sm' onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < products.length && (
        <div className="text-center my-4">
          <button className="btn btn-primary px-5 rounded-pill shadow-sm" onClick={() => setVisibleCount(prev => prev + 4)}>
            Read More Cribs
          </button>
        </div>
      )}

      {/* chatbot */}
      <Chatbot/>
      {/* MAP */}
      <PropertyMap houses={products} />
        
      <div className="text-center my-5">
        <img src="/images/graph.png" alt="statusgraph" className="img-fluid" />
      </div>

     
      <Footer/>

    </div>
  )
}

export default Getproducts
