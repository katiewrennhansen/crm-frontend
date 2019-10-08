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
        const broker = {
            first: e.target.first.value,
            last: e.target.last.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            country: e.target.country.value,
            password: e.target.password.value,
            repeatPassword: e.target.repeatPassword.value,
            type: 'broker'
        }
        this.setState({
            registerUser: broker
        })
        console.log(`broker registered`)
    }

    render(){
        console.log(this.state.registerUser)
        return (
            <div className='broker-registration-container'>
                <h1>Create a broker account to start the selling process</h1>
                <div className='broker-registration-content'>
                    <RegistrationForm handleSubmit={this.handleSubmit}/>
                    <p>
                        Already have an account?&nbsp; 
                        <Link to='/login' style={{color: 'lightgreen'}}>
                            Login now!
                        </Link>
                    </p>
                </div>
            </div>
        )
    }
}

export default BrokerRegistration