import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './MainNav.css'
 
class MainNav extends Component {
    render() {
        return (
            <nav>
                <div className='logo'>
                <Link to="/" style={{color: '#343434', textDecoration: 'none'}}>
                    <h2>Apartment<span className='color'>Chile</span></h2>
                </Link>
                </div>
                <div className='collapsed-content'>
                    <div className='main-nav'>
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <p className='link'>Home</p>
                        </Link>
                        <Link to="/about" style={{textDecoration: 'none'}}>
                            <p className='link'>About</p>
                        </Link>
                        <Link to="/services" style={{textDecoration: 'none'}}>
                            <p className='link'>Services</p>
                        </Link>
                        <Link to="/search" style={{textDecoration: 'none'}}>
                            <p className='link'>Search</p>
                        </Link>
                        <Link to="/contact" style={{textDecoration: 'none'}}>
                            <p className='link'>Contact</p>
                        </Link>
                    </div>
                    <div className='login-nav'>
                        <Link to="/login" style={{textDecoration: 'none'}}>
                            <p className='login'>Login</p>
                        </Link>
                        <Link to="/select-account-type" style={{textDecoration: 'none'}}>
                            <p className='register'>Register</p>
                        </Link>
                    </div>
                </div>
            </nav>
        )
    }
}

export default MainNav