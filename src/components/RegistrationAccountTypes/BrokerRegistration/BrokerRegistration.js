import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RegistrationForm from '../RegistrationForm/RegistrationFrom';
import './BrokerRegistration.css'
// import RegistrationContext from '../../../RegistrationContext'

class BrokerRegistration extends Component {
    // static contextType = RegistrationContext;

    state = {
        registerUser: {}
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const first = e.target.first.value
        const last = e.target.last.value
        const email = e.target.email.value
        const phone = e.target.phone.value
        const country = e.target.country.value
        const password = e.target.password.value
        const repeatPassword = e.target.repeatPassword.value
        this.setState({
            registerUser: {
                type: 'broker',
                first: first,
                last: last,
                email: email,
                phone: phone,
                country: country,
                password: password,
                repeatPassword: repeatPassword
            }
        })
        console.log(`broker registered`)
    }

    render(){
        console.log(this.state.registerUser)
        return (
            <div className='broker-registration-container'>
                <h1>Create a broker account to start the selling process</h1>
                <RegistrationForm handleSubmit={this.handleSubmit}/>
                <p>
                    Already have an accout?  
                    <Link to='/login'>
                        Login now!
                    </Link>
                </p>
            </div>
        )
    }
}

export default BrokerRegistration