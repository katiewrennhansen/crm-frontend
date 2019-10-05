import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

class Footer extends Component {
    render(){
        return (
            <div className='footer-container'>
                <div>
                    <h2>ApartmentChile</h2>
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
                <div>
                <div className='footer-nav'>
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
                </div>
            </div>
        )
    }
}

export default Footer