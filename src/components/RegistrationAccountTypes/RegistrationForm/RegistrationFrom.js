import React, { Component } from 'react'
import './RegistrationForm.css'
import LoginButton from '../../Login/LoginComponents/LoginButton'
import TextInput from '../../Login/LoginComponents/TextInput'

class RegistrationForm extends Component {

    render(){
        return (
            <div>
                <form onSubmit={(e) => this.props.handleSubmit(e)}>
                    <div className='form-group'>
                        <label htmlFor='first'></label>
                        <TextInput 
                            id='firstname'
                            type='text'
                            name='firstname'
                            label='First Name'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='last'></label>
                        <TextInput 
                            id='lastname'
                            type='text'
                            name='lastname'
                            label='Last Name'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='email'></label>
                        <TextInput 
                            id='email'
                            type='email' 
                            name='email'
                            label='Email'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='phone'></label>
                        <TextInput 
                            id='phone'
                            type='number' 
                            name='phone'
                            label='Phone'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='country'></label>
                        <TextInput
                            id='country'
                            type='text' 
                            name='country'
                            label='Country'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="password"></label>
                        <TextInput
                            id='password'
                            type='password' 
                            name='password'
                            label='Password'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="repeatPassword"></label>
                        <TextInput
                            id='repeatPassword'
                            type='password' 
                            name='repeatPassword'
                            label='Repeat Password'
                        />
                    </div>

                    <div className='form-group'>
                        <input type='checkbox' name='terms' required></input>
                        <label id='terms' htmlFor='terms'> I have read agree to the terms and conditions</label>
                    </div>

                    <div className='form-group'>
                        <LoginButton text='Create account' />
                    </div>
                </form>
            </div>
        )
    }
}

export default RegistrationForm