import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RegistrationForm from '../RegistrationForm/RegistrationFrom'
import './UserRegistration.css'

class UserRegistration extends Component {

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
                type: 'user',
                first: first,
                last: last,
                email: email,
                phone: phone,
                country: country,
                password: password,
                repeatPassword: repeatPassword
            }
        })
        console.log('registered new user')
        //make a POST req to back-end API with registration information
    }

    render(){
        console.log(this.state.registerUser)
        return (
            <div className='user-registration-container'>
                <h1>Create a user account to start the renting process</h1>
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

export default UserRegistration