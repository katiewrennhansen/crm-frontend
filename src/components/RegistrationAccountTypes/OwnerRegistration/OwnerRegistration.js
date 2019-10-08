import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RegistrationForm from '../RegistrationForm/RegistrationFrom'
import './OwnerRegistration.css'

class OwnerRegistration extends Component {

    state = {
        registerUser: {}
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const owner = {
            first: e.target.first.value,
            last: e.target.last.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            country: e.target.country.value,
            password: e.target.password.value,
            repeatPassword: e.target.repeatPassword.value,
            type: 'owner'
        }
        this.setState({
            registerUser: owner
        })
        console.log('owner registered')
    }

    render(){
        console.log(this.state.registerUser)
        return (
            <div className='owner-registration-container'>
                <h1>Create an owner account to start the selling process</h1>
                <div className='owner-registration-content'>
                    <RegistrationForm handleSubmit={this.handleSubmit} />
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

export default OwnerRegistration