import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RegistrationForm from '../RegistrationForm/RegistrationFrom'
import AuthApiService from '../../../services/auth-api-service'
import './UserRegistration.css'

class UserRegistration extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            user: {
                firstname: e.target.firstname.value,
                lastname: e.target.lastname.value,
                email: e.target.email.value,
                country: e.target.country.value,
                phone: e.target.phone.value,
                usertype: "user",
                company_id: 6,
                password: e.target.password.value,
            }
        }
        AuthApiService.postUser(newUser)
            .catch(err => {
                console.log(err)
            })
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