import React, { Component } from 'react'
import './Footer.css'
import NavLinks from '../NavLinks/NavLinks'

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
                        <NavLinks />
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Footer