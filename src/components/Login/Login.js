import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import SubmitButton from './LoginComponents/SubmitButton'
import TextInput from './LoginComponents/TextInput'




class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            usertype: 'user',
            authenticated: false
        }
        this.updateEmail = this.updateEmail.bind(this)

    }

    updateEmail(email){
        this.setState({
            email: email,
        })
        console.log(email);
    }

    selectUserAccount(usertype){
        if(usertype === 'admin') {
            this.props.history.push('/dashboard')
        } else if(usertype === 'user') {
            this.props.history.push('/user-home')
        }
    }

    setLocalStorage(email, usertype){
        if (this.state.authenticated){
            localStorage.setItem('email', email)
            localStorage.setItem('usertype', usertype)
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //define user data object
        const authUser = {
            "user": {
                "email": e.target.email.value,
                "password": e.target.password.value
            }
        }
        //call API to post registered users
        const url = 'https://crmmia-api.herokuapp.com/api/users/login'
        const options = {
            method: 'POST',
            body: JSON.stringify(authUser),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            }
        }
        //fetch data from /users/login enpoint
        fetch(url, options)
        .then(res => {
            console.log(res)
            //throw error if user is not authenticated
            if(!res.ok){
                throw new Error('user not authenticated');
            }
            //set App.js authentication state to true
            this.props.isAuthenticated(true);
            return res.json();
        })
        .then(resJson => {
            console.log(resJson)
            //set Login.js authentication state to true
            this.props.handleUserType(resJson.usertype);
            this.setState({
                email: resJson.email,
                usertype: resJson.usertype,
                authenticated: true
            })
            this.setLocalStorage(resJson.email, resJson.usertype)
            this.selectUserAccount(resJson.usertype);
        })
        .catch(err => {
            console.log(err)
        })
      
    }

   

    render(){
        return (
            <div className='login-container'>
                <h1>Enter your Login information</h1>
                <div className='margin-container'>
                    <div className='error-message'></div>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='form-group'>
                            <label htmlFor='email'></label>
                            <TextInput
                                id='email'
                                name='email'
                                label='Email'
                                type='email'
                                autoComplete='email'
                                updateEmail={(e) => this.updateEmail(e.target.value)}
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

