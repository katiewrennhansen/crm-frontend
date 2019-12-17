import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import NavLinks from '../NavLinks/NavLinks'

class Footer extends Component {
    render(){
        return (
            <footer>
                <div className='footer-container'>
                    <div className='company-info'>
                        <h2>Apartment<span className='green-logo'>Chile</span></h2>
                        <address>
                            Alonso de Cordova 5870 Of. 1611<br>
                            </br>
                            Las Condes
                        </address>
                        <p>Contáctese con nuestros ejecutivos y lo atenderemos en forma rápida y personalizada.</p>
                    </div>
                    <div className='contact-info'>
                        <p>Phone: +56229578210</p>
                        <p>WhatsApp: +56930660066</p>
                        <p>Phone: +56 9 72131448</p>
                        <p>Email: <Link to="mailto:info@apartmentchile.com">info@apartmentchile.com</Link></p>
                    </div>
                    <div className='footer-nav-links'>
                        <NavLinks />
                    </div>
                </div>
                <div className="footer-line"></div>
                <p className="credit">Website by katiewrennhansen</p>
            </footer>

        )
    }
}

export default Footer