import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RegistrationForm from '../RegistrationForm/RegistrationFrom';
import './BrokerRegistration.css'

class BrokerRegistration extends Component {

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
                "usertype": "broker",
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