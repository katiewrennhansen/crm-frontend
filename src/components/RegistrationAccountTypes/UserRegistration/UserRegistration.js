import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RegistrationForm from '../RegistrationForm/RegistrationFrom'
import './UserRegistration.css'

class UserRegistration extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        //define user data object
        const newUser = {
            "user": {
                "firstname": e.target.firstname.value,
                "lastname": e.target.lastname.value,
                "email": e.target.email.value,
                "country": e.target.country.value,
                "phone": e.target.phone.value,
                "usertype": "user",
                "company_id": 1,
                "password": e.target.password.value,
            }
        }
        //call API to post registered users
        const url = 'https://crmmia-api.herokuapp.com/api/users'
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
        //Redirect newly registered users to login page
        this.props.history.push('/login');
    }


    render(){
        return (
            <div className='user-registration-container'>
                <h1>Create an account</h1>
                <div className='user-registration-content'>
                    <RegistrationForm 
                        handleSubmit={this.handleSubmit}
                        updateState={this.updateState}
                    />
                    <p>
                        Already have an account?&nbsp;  
                        <Link to='/login' style={{color: 'green'}}>
                            Login now!
                        </Link>
                    </p>
                </div>
            </div>
        )
    }
}

export default UserRegistration