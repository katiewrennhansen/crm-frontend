import React, { Component } from 'react'
import { Link } from 'react-router-dom'
 
class MainNav extends Component {
    render() {
        return (
            <nav>
                <Link to="/">
                    <h2>ApartmentChileLogo</h2>
                </Link>
                <div className='collapsed-content'>
                    <div className='main-nav'>
                        <Link to="/">
                            Home
                        </Link>
                        <Link to="/about">
                            About Us
                        </Link>
                        <Link to="/services">
                            Services
                        </Link>
                        <Link to="/search">
                            Search
                        </Link>
                        <Link to="/contact">
                            Contact
                        </Link>
                    </div>
                    <div className='login-nav'>
                        <Link to="/login">
                            Login
                        </Link>
                        <Link to="/register">
                            Register
                        </Link>
                    </div>
                </div>
            </nav>
        )
    }
}

export default MainNav