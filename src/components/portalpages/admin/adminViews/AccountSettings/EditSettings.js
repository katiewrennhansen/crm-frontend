import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
// import './AdminComments.css'

class EditSettings extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('info updated')
        const first = e.target.firstname.value;
        console.log(first);
        this.props.history.push('/dashboard/account-settings')
    }

    render(){
        return (
            <div className='admin-dashboard'>
                <div className='dash-container'>
                    <h3>Edit Settings</h3>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
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
                        <label htmlFor='last'></label>
                        <TextInput 
                            id='companyName'
                            type='text'
                            name='companyname'
                            label='Company Name'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='address'></label>
                        <TextInput 
                            id='address'
                            type='address' 
                            name='address'
                            label='Company Address'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='email'></label>
                        <TextInput 
                            id='email'
                            type='email' 
                            name='email'
                            label='Company Email'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='phone'></label>
                        <TextInput 
                            id='phone'
                            type='number' 
                            name='phone'
                            label='Company Phone'
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
                    <Link to='/dashboard/account-settings'>Back</Link>
                    <SubmitButton 
                        text='save'
                    />
                    </form>
                </div>
                
            </div>
        )
    }
}

export default EditSettings