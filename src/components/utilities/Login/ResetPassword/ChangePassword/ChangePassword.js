import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './ChangePassword.css'
import TextInput from '../../LoginComponents/TextInput'
import SubmitButton from '../../LoginComponents/SubmitButton'

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
                                name='repeatPassword'
                                id='repeatPassword'
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
                    <p>
                        Don't have an account?&nbsp;
                        <Link to='/register' style={{color: 'green'}}>
                            Sign up now!
                        </Link>
                    </p>
                </div>
            </div>
        )
    }
}

export default ChangePassword