import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './ChangePassword.css'

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

    validatePassword(){
        const password = this.state.password.value.trim();
        if(password.length === 0){
            console.log('password is required')
            return 'password is required'
        }
        else if(password.length < 3 || password.length > 50){
            console.log('password must be between 3 and 50 characters')
            return 'password must be between 3 and 50 characters'
        } else if(!password.match(/[0-9]/)){
            console.log('password must contain at least one number')
            return 'password must contain at least one number'
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted')
        const password = this.state.password.value;
        console.log(`
        Password: ${password}
        `)

    }

    render(){
        return (
            <div className='login-container'>
                <h1>Enter a new password</h1>
                <div className='margin-container'>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
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
                            <label htmlFor="repeat-password">Repeat Password: </label>
                            <input 
                                type='password' 
                                name='repeat-password'
                                id='repeat-password'
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
                </div>
            </div>
        )
    }
}

export default ChangePassword