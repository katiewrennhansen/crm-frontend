import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import SubmitButton from './LoginComponents/SubmitButton'
import TextInput from './LoginComponents/TextInput'
import TokenService from '../../../services/token-service'
import AuthApiService from '../../../services/auth-api-service'


class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            usertype: '',
            error: null
        }
    }

    selectUserAccount(usertype){
        if(usertype === 'admin') {
            this.props.history.push('/dashboard')
        } else if(usertype === 'user') {
            this.props.history.push('/user-home')
        } else if (usertype === 'broker') {
            this.props.history.push('/broker')
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const authUser = {
            user: {
                email: e.target.email.value,
                password: e.target.password.value
            }
        }
        AuthApiService.postLogin(authUser)
            .then(resJson => {
                TokenService.saveAuthToken(resJson.token)
                this.props.handleUserType(resJson.usertype);
                this.selectUserAccount(resJson.usertype);
            })
            .catch(err => {
                this.setState({ error: err.error })
            })
    }

    render(){
        return (
            <div className='login-container'>
                <h1>Enter your Login information</h1>
                <div className='margin-container'>
                    {(this.state.error) 
                        ? (<div className='error-message'>{this.state.error}</div>)
                        : null
                    }
                    <form className='login-form' onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='form-group'>
                            <label htmlFor='email'></label>
                            <TextInput
                                id='email'
                                name='email'
                                label='Email'
                                type='email'
                                autoComplete='email'
                            />
                        </div>
                        
                        <div className='form-group'>
                            <label htmlFor="password"></label>
                            <TextInput 
                                id='password'
                                name='password'
                                label='Password'
                                type='password'
                                autoComplete='password'
                            />
                        </div>
                        <div className='form-group'>
                            <SubmitButton
                                text='Log In'
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
                        <p className='forgot-password'>
                            Forgot password?&nbsp;
                            <Link to='/forgot-password' style={{color: 'green'}}>
                                Reset password
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login

