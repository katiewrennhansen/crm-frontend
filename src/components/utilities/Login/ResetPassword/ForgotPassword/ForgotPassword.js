import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './ForgotPassword.css'
import SubmitButton from '../../Login/LoginComponents/SubmitButton'
import TextInput from '../../Login/LoginComponents/TextInput'

class ForgotPassword extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: {
                value: ''
            }
        }
    }

    updateEmail(email){
        this.setState({
            email: {
                value: email
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
                            <TextInput
                                id='email'
                                type='email'
                                label='Email'
                                name='email'
                                onChange={(e) => this.updateEmail(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <SubmitButton 
                                text="Send password reset"
                            />
                        </div>
                    </form>
                    <div className='password-controls'>
                        <p>
                            Don't have an account?&nbsp;
                            <Link to='/register' style={{color: 'green'}}>
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