import React, { Component } from 'react'
import './RegistrationForm.css'
// import RegistrationContext from '../../../RegistrationContext'

class RegistrationForm extends Component {
    // static contextType =  RegistrationContext

    //    state = {
    //         first: {
    //             value: '',
    //             touched: false
    //         },
    //         last: {
    //             value: '',
    //             touched: false
    //         },
    //         email: {
    //             value: '',
    //             touched: false
    //         },
    //         phone: {
    //             value: '',
    //             touched: false
    //         },
    //         country: {
    //             value: '',
    //             touched: false
    //         },
    //         password: {
    //             value: '',
    //             touched: false
    //         },
    //         repeatPassword: {
    //             value: '',
    //             touched: false
    //         },
    //     }
    

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

    render(){
        return (
            <form onSubmit={(e) => this.props.handleSubmit(e)}>
                <div className='form-group'>
                    <label htmlFor='first'>First Name: </label>
                    <input 
                        type='text' 
                        name='first'
                        id='first'
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='last'>Last Name: </label>
                    <input 
                        type='text' 
                        name='last'
                        id='last'
                    />
                </div>

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
        )
    }
}

export default RegistrationForm