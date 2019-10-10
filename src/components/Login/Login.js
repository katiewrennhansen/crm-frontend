import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import axios from 'axios'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: {
                value: '',
                touched: false
            },
            password: {
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

    // validatePassword(){
    //     const password = this.state.password.value.trim();
    //     if(password.length === 0){
    //         console.log('password is required')
    //         return 'password is required'
    //     }
    //     else if(password.length < 3 || password.length > 50){
    //         console.log('password must be between 3 and 50 characters')
    //         return 'password must be between 3 and 50 characters'
    //     } else if(!password.match(/[0-9]/)){
    //         console.log('password must contain at least one number')
    //         return 'password must contain at least one number'
    //     }
    // }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted')
        const email = this.state.email.value;
        const password = this.state.password.value;
        console.log(`
        Email: ${email}
        Password: ${password}
        `)
        const url = 'https://crmmia.herokuapp.com/api/users'

        // fetch(url, {
        //     method: 'POST',
        //     body:  `${email}:${password}`

        // }, 
        // { withCredentials: true }
        // )
        // .then(res => {
        //     console.log(res)
        // })
        // .catch(err => {
        //     console.log(err)
        // })

        axios.get(url)
        .then(res => {
            console.log(res)
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
                                onChange={(e) => this.updatePassword(e.target.value)}
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