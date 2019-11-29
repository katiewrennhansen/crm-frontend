import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import config from '../../../../../config'
import './CompanySetUp.css'
import ApiService from '../../../../../services/api-service'


class EditSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        ApiService.getDataHalf(config.COMPANY_SETUP_ENDPOINT)
        .then(data => {
            this.setCompanyInfo(data.data)
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { company_name, contact, address, email, phone, country, tax_id } = e.target
        let updatedInfo = {}

        if(company_name.value !== ''){
            updatedInfo.company = company_name.value
        }
        if(contact.value !== ''){
            updatedInfo.contact = contact.value
        }
        if(address.value !== ''){
            updatedInfo.adescription1 = address.value
        }
        if(email.value !== ''){
            updatedInfo.email = email.value
        }
        if(phone.value !== ''){
            updatedInfo.phone = phone.value
        }
        if(country.value !== ''){
            updatedInfo.adescription2 = country.value
        }
        if(tax_id.value !== ''){
            updatedInfo.ctax_id = tax_id.value
        }

        console.log(updatedInfo)

        this.props.history.push('/dashboard/company-setup')
    }


    render(){
        return (
            <div className='edit-company'>
                <h3>Edit Company Information</h3>
                <form className="edit-company-form" onSubmit={(e) => this.handleSubmit(e)}>

                <div className='form-group'>
                    <label htmlFor='last'></label>
                    <TextInput
                        id="company_name"
                        label='Company Name'
                        name='company_name'
                        margin="normal"
                        variant="outlined"
                        />
                </div>

                <div className='form-group'>
                    <label htmlFor='first'></label>
                    <TextInput 
                        id='contact'
                        type='text'
                        label='Contact'
                        name='contact'
                        defaultValue="text"
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

                <div className='form-group'>
                    <label htmlFor='tax_id'></label>
                    <TextInput
                        id='tax_id'
                        type='number' 
                        name='tax_id'
                        label='Tax ID'
                    />
                </div>
                <div className='edit-company-form-btn'>
                    <Link 
                        className='company-btn cancel'
                        to='/dashboard/company-setup'
                    >
                        Back
                    </Link>
                    <SubmitButton 
                        className='save'
                        text='save'
                    />
                </div>
            </form>
        </div>
          
        )
    }
}

export default EditSettings