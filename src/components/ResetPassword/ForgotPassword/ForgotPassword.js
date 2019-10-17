import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './ForgotPassword.css'
import EmailInput from '../../Login/LoginComponents/EmailInput'
import LoginButton from '../../Login/LoginComponents/LoginButton'

class ForgotPassword extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: {
                value: '',
                touched: false
            }
        }
    }

    updateEmail(email){
        this.setState({
            email: {
                value: email,
                touched: true
            }
        })
    }

    updatePassword(password){
        this.setState({
            password: {
                value: password,
                touched: true
            }
        })
    }

    // validateEmail(){
    //     const email = this.state.email.value.trim();
    //     if(email.length < 3 || email.length > 40){
    //         console.log('email must be between 3 and 40 characters')
    //         return 'email must be between 3 and 40 characters'
            
    //     }
    // }



    handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted')
        const email = this.state.email.value;
        console.log(`
        Email: ${email}
        `)

    }

    render(){
        return (
            <div className='login-container'>
                <h1>Enter your email to send reset password link</h1>
                <div className='margin-container'>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='form-group'>
                            <label htmlFor='email'></label>
                            <EmailInput
                                onChange={(e) => this.updateEmail(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <LoginButton 
                                text="Send password reset"
                            />
                        </div>
                    </form>
                    <div className='password-controls'>
                        <p>
                            Don't have an account?&nbsp;
                            <Link to='/select-account-type' style={{color: 'green'}}>
                                Sign up now!
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword