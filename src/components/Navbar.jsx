import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("user")
        navigate("/signin")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top py-3">
            <div className="container">
                
                {/* Logo */}
                <Link to="/" className="navbar-brand fw-bold d-flex align-items-center">
                    <span className="me-2 fs-3">🏠</span>
                    <span style={{ letterSpacing: '1px', textTransform: 'uppercase', fontSize: '1.2rem' }}>Kijana Cribs</span>
                </Link>

                {/* Toggle button */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Nav content */}
                <div className="collapse navbar-collapse" id="navbarNav">

                    {/* Center links */}
                    <ul className="navbar-nav mx-auto gap-lg-4">
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-uppercase fs-7 fw-medium">Home</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to="/" className="nav-link text-uppercase fs-7 fw-medium">Cribs</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link text-uppercase fs-7 fw-medium">Booking Cart</Link>
                        </li>

                        {user && (
                            <li className="nav-item">
                                <Link to="/addproducts" className="nav-link text-uppercase fs-7 fw-medium">
                                    Manage Listings
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/* Right side */}
                    <ul className="navbar-nav ms-auto align-items-center">
                        {user ? (
                            <>
                                <li className="nav-item me-3 text-light">
                                    <span className="opacity-75">Welcome,</span> <strong>{user.username}</strong>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        onClick={logout} 
                                        className="btn btn-outline-danger btn-sm px-4 rounded-pill"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item me-2">
                                    <Link to="/signin" className="btn btn-link text-light text-decoration-none px-3">
                                        Sign In
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className="btn btn-primary btn-sm px-4 rounded-pill shadow-sm">
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar