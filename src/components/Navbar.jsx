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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
            <div className="container">
                
                {/* Logo */}
                <Link to="/" className="navbar-brand fw-bold">
                    🏠 Kijana Cribs
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
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>

                        {user && (
                            <li className="nav-item">
                                <Link to="/addproducts" className="nav-link">
                                    Add Products
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/* Right side */}
                    <ul className="navbar-nav ms-auto align-items-center">
                        {user ? (
                            <>
                                <li className="nav-item me-3 text-light">
                                    👋 {user.username}
                                </li>
                                <li className="nav-item">
                                    <button 
                                        onClick={logout} 
                                        className="btn btn-outline-light btn-sm"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item me-2">
                                    <Link to="/signin" className="btn btn-outline-light btn-sm">
                                        Sign In
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className="btn btn-warning btn-sm">
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