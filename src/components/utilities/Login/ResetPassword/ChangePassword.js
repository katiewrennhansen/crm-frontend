import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TextInput from '../LoginComponents/TextInput'
import SubmitButton from '../LoginComponents/SubmitButton'
import ValidationService from '../../../../services/validation-service'

class ChangePassword extends Component {
    constructor(props){
        super(props)
        this.state = {
            password: {
                value: '',
                touched: false
            }
        }
    }

    updatePassword(password){
        this.setState({
            password: {
                value: password,
                touched: true
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newPassword = e.target.password.value
        const error = ValidationService.validatePassword(newPassword)
        if(error){
            this.setState({ error: error })
        } else {
            this.props.history.push('/login')
        }
    }

    render(){
        return (
            <div className='login-container'>
                <h1>Enter a new password</h1>
                <div className='margin-container'>
                    {(this.state.error) ? <p className='error-message'>{this.state.error}</p> : null}
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='form-group'>
                            <label htmlFor="password"></label>
                            <TextInput
                                type='password' 
                                name='password'
                                id='password'
                                label="New Password"
                                onChange={(e) => this.updatePassword(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="repeat-password"></label>
                            <TextInput
                                type='password' 
                                name='repeat-password'
                                id='repeat-password'
                                label="Repeat New Password"
                                onChange={(e) => this.updatePassword(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <SubmitButton 
                                text='Reset Password'
                            />
                        </div>
                    </form>
                    <div className="password-controls">
                        <p>Don't have an account?&nbsp;
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

export default ChangePassword