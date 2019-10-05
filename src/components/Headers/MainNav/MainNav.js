import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './MainNav.css'
 
class MainNav extends Component {
    render() {
        return (
            <nav>
                <div className='logo'>
                <Link to="/">
                    <h2>ApartmentChileLogo</h2>
                </Link>
                </div>
                <div className='collapsed-content'>
                    <div className='main-nav'>
                        <Link to="/">
                            <p className='link'>Home</p>
                        </Link>
                        <Link to="/about">
                            <p className='link'>About</p>
                        </Link>
                        <Link to="/services">
                            <p className='link'>Services</p>
                        </Link>
                        <Link to="/search">
                            <p className='link'>Search</p>
                        </Link>
                        <Link to="/contact">
                            <p className='link'>Contact</p>
                        </Link>
                    </div>
                    <div className='login-nav'>
                        <Link to="/login">
                        <   p className='link'>Login</p>
                        </Link>
                        <Link to="/select-account-type">
                            <p className='link'>Register</p>
                        </Link>
                    </div>
                </div>
            </nav>
        )
    }
}

export default MainNav