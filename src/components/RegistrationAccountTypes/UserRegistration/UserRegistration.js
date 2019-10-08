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
        const user = {
            firstname: e.target.first.value,
            lastname: e.target.last.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            country: e.target.country.value,
            password: e.target.password.value,
            usertype: 'user'
        }
        this.setState({
            registerUser: user
        })
        console.log('registered new user')
        //make a POST req to back-end API with registration information
    }



    render(){
        console.log(this.state.registerUser)
        return (
            <div className='user-registration-container'>
                <h1>Create a user account to start the renting process</h1>
                <div className='user-registration-content'>
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

export default UserRegistration