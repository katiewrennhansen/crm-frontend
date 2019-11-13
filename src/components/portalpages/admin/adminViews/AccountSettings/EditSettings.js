import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import config from '../../../../../config'
import TextField from '@material-ui/core/TextField';


class EditSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false,
            companyInfo: [],
            error: null
        };
    }

    setCompanyInfo = companyInfo => {
        this.setState({
            companyInfo: companyInfo,
            error: null
        })
    }

    componentDidMount(){
        fetch(config.COMPANY_SETUP_ENDPOINT, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
        })
        .then(data => {
            this.setCompanyInfo(data.data)
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('info updated')
        const first = e.target.firstname.value;
        console.log(first);
        this.props.history.push('/dashboard/account-settings')
    }

    handleChange = event => {
        this.setState({ companyInfo: {
            company: event.target.value
            }
        })
      };
   

    render(){
        return (
            <div className='admin-dashboard'>
                <div className='dash-container'>
                    <h3>Edit Settings</h3>
                    <form onSubmit={(e) => this.handleSubmit(e)}>

                    <div className='form-group'>
                        <label htmlFor='last'></label>
                        <TextField
                            id="company_name"
                            multiline
                            rowsMax="4"
                            value={this.state.companyInfo.company}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='first'></label>
                        <TextInput 
                            id='firstname'
                            type='text'
                            label='First Name'
                            name='firstname'
                            defaultValue="text"
                            value={this.state.companyInfo.company}
                            onChange={this.handleChange}
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
                    <Link to='/dashboard/company-setup'>Back</Link>
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