import React, { Component } from 'react'
import './RegistrationForm.css'

class RegistrationForm extends Component {

    render(){
        return (
            <div>
                <form onSubmit={(e) => this.props.handleSubmit(e)}>
                    <div className='form-group'>
                        <label htmlFor='first'>First Name: </label>
                        <input 
                            type='text' 
                            name='firstname'
                            id='firstname'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='last'>Last Name: </label>
                        <input 
                            type='text' 
                            name='lastname'
                            id='lastname'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='email'>Email: </label>
                        <input 
                            type='email' 
                            name='email'
                            id='email'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='phone'>Phone: </label>
                        <input 
                            type='number' 
                            name='phone'
                            id='phone'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='country'>Country: </label>
                        <input 
                            type='text' 
                            name='country'
                            id='country'
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
                        <label htmlFor="repeatPassword">Repeat Password: </label>
                        <input 
                            type='password' 
                            name='repeatPassword'
                            id='repeatPassword'
                        />
                    </div>

                    <div className='form-group'>
                        <input type='checkbox' name='terms' required></input>
                        <label id='terms' htmlFor='terms'> I have read agree to the terms and conditions</label>
                    </div>

                    <div className='form-group'>
                        <input type='submit'></input>
                    </div>
                </form>
            </div>
        )
    }
}

export default RegistrationForm