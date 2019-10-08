import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

class Footer extends Component {
    render(){
        return (
            <div className='footer-container'>
                <div className='company-info'>
                    <h2>Apartment<span className='green-logo'>Chile</span></h2>
                    <p>Contáctese con nuestros ejecutivos y lo atenderemos en forma rápida y personalizada.</p>
                </div>
                <div className='contact-info'>
                    <address>
                        Alonso de Cordova 5870 Of. 1611<br>
                        </br>
                        Las Condes
                    </address>
                    <p>Phone: +56229578210</p>
                    <p>WhatsApp: +56930660066</p>
                    <p>Phone: +56 9 72131448</p>
                    <p>Email: info@apartmentchile.com</p>
                </div>
                <div className='footer-nav'>
                    <div className='footer-nav-links'>
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
                </div>
            </div>
        )
    }
}

export default Footer