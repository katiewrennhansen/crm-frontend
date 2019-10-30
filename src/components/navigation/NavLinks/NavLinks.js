import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class NavLinks extends Component {
    render(){
        return (
            <>
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
            </>
        )
    }
}

export default NavLinks