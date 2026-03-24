import React from 'react'

const Footer=()=>{
    return(

        <div className='row bg-secondary text-light p-4'>
            <div className='col-md-4'>
                <h3 className='text-center text-dark'>About Us</h3>
                <p>t Kijana Cribs, we provide comfortable, stylish, and affordable living spaces tailored to meet your lifestyle needs. We are committed to creating a welcoming environment where quality and convenience come first. Your feedback matters to us, as it helps us continually improve our services and enhance your living experience. Whether you’re looking for a cozy space or a modern setup, Kijana Cribs offers a variety of options designed with you in mind. Welcome, and we look forward to not only meeting but exceeding your expectations. </p>
            </div>

            <div className='col-md-4'>
                <h4 className='text-dark'>Contact us</h4>
                <form>
                    <input type='email' placeholder='Enter your email' className='form-control' required/>
                    <br/>
                    <textarea placeholder='Leave a comment'
                    className='form-control'/>
                    <br/>
                    <button type='submit' className='btn btn-dark'>Send message</button>
                </form>
            </div>

            <div className='col-md-4 text-center'>
                <h4 class="text-center">Let's grow together. Stay in touch</h4>
                <a href="https://www.facebook.com"><img src="/images/fb.png" alt=""/></a>
                <a href="https://www.instagram.com"><img src="images/in.png" alt=""/></a>
                <a href="https://www.x.com"><img src="images/x.png" alt=""/></a>
                <p class="mt-3">See it in the wild. Join our community</p>

            </div>
            

        </div>
    )

}

export default Footer
