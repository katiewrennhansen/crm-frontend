import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RegistrationForm from './RegistrationFrom'
import AuthApiService from '../../../../services/auth-api-service'
import ValidationService from '../../../../services/validation-service'
import '../Login.css'

class UserRegistration extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null
        }
    }

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
                password: e.target.password.value,
            }
        }

        const emailError = ValidationService.validateEmail(e.target.email.value)
        const passwordError = ValidationService.validatePassword(e.target.password.value)

        if(emailError){
            this.setState({ error: emailError })
        } else if (passwordError){
            this.setState({ error: passwordError })
        } else {
            AuthApiService.postUser(newUser)
            .catch(err => {
                console.log(err)
            })
            this.props.history.push('/login');
        }
    }


    render(){
        return (
            <div className='register-container'>
                <h1>Create an account</h1>
                <div className='margin-container'>
                    {(this.state.error) ? <p className='error-message'>{this.state.error}</p> : null}
                    <RegistrationForm 
                        handleSubmit={this.handleSubmit}
                    />
                    <div className="password-controls">
                        <p>Already have an account?&nbsp;  
                            <Link to='/login' style={{color: 'green'}}>
                                Login now!
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserRegistration