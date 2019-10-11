import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: {
                value: '',
                touched: false
            },
            usertype: 'user'
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


    validateEmail(){
        const email = this.state.email.value.trim();
        if(email.length < 3 || email.length > 40){
            console.log('email must be between 3 and 40 characters')
            return 'email must be between 3 and 40 characters'
            
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        //define user data object
        const authUser = {
            "email": e.target.email.value,
            "password": e.target.password.value
        }
        //call API to post registered users
        const url = 'https://crmmia-api.herokuapp.com/api/users/login'
        const options = {
            method: 'POST',
            body: JSON.stringify(authUser),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(resJson => {
            console.log(resJson);
            const usertype = resJson.usertype
            if(this.state.usertype !== null){
                this.props.history.push(`/${usertype}-home`); 
            } 
            return;
        })
        .catch(err => {
            console.log(err)
        })

        // console.log(this.state.usertype)
        //Redirect newly registered users to login page
    }

        

    render(){

        return (
            <div className='login-container'>
                <h1>Enter your Login information</h1>
                <div className='margin-container'>
                    <div className='error-message'></div>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='form-group'>
                            <label htmlFor='email'>Email: </label>
                            <input 
                                type='email' 
                                name='email'
                                id='email'
                                onChange={(e) => this.updateEmail(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password">Password: </label>
                            <input 
                                type='password' 
                                name='password'
                                id='password'
                            />
                        </div>
                        <div className='form-group'>
                            <input 
                                type='submit'
                            />
                        </div>
                    </form>
                    <p>
                        Don't have an account?&nbsp;
                        <Link to='/select-account-type' style={{color: 'lightgreen'}}>
                            Sign up now!
                        </Link>
                    </p>
                    <p className='forgot-password'>
                        Forgot password?&nbsp;
                        <Link to='/forgot-password' style={{color: 'lightgreen'}}>
                            Reset password
                        </Link>
                    </p>
                </div>
            </div>
        )
    }
}

export default Login