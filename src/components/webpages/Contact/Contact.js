import React, { Component } from 'react'
import MainNav from '../navigation/Headers/MainNav/MainNav'
import Footer from '../navigation/Footer/Footer'

class Contact extends Component {
    render(){
        return (
            <div className="web-home">
                <MainNav 
                    authenticated={this.props.authenticated} 
                    logout={this.props.logout} 
                />
                <div>
                    <h1>This is the Contact Page</h1>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Contact