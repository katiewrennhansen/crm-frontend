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
        const newUser = {
            "user": {
                "firstname": e.target.first.value,
                "lastname": e.target.last.value,
                "email": e.target.email.value,
                "country": e.target.country.value,
                "phone": e.target.phone.value,
                "usertype": "user",
                "company_id": 1,
                "password": e.target.password.value,
            }
        }
        const url = 'https://crmmia.herokuapp.com/api/users'
        const options = {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
        console.log('registered new user')
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