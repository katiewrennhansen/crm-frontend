import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SubmitButton from '../LoginComponents/SubmitButton'
import TextInput from '../LoginComponents/TextInput'
import ValidationService from '../../../../services/validation-service'

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

    handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value
        const error = ValidationService.validateEmail(email)
        if(error){
            this.setState({ error: error })
        } else {
            this.props.history.push('/change-password')
        }
    }

    render(){
        return (
            <div className='login-container'>
                <h1>Enter your email to send reset password link</h1>
                <div className='margin-container'>
                {(this.state.error) ? <p className='error-message'>{this.state.error}</p> : null}
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