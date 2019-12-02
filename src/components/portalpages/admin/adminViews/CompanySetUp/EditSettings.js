import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
        const info = this.state.companyInfo
        return (
            <div className='edit-company'>
                <h3>Edit Company Information</h3>
                <form className="edit-company-form" onSubmit={(e) => this.handleSubmit(e)}>

                <div className='form-group'>
                    <label htmlFor='company_name'>Company Name</label>
                    <input
                        type="text"
                        id="company_name"
                        name='company_name'
                        defaultValue={info.company}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='contact'>Contact</label>
                    <input 
                        id='contact'
                        type='text'
                        name='contact'
                        defaultValue={info.contact}
                    />
                </div>            

                <div className='form-group'>
                    <label htmlFor='address'>Address</label>
                    <input 
                        id='address'
                        type='text' 
                        name='address'
                        defaultValue={info.adescription3}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='city'>City</label>
                    <input 
                        id='city'
                        type='text' 
                        name='city'
                        defaultValue={info.adescription2}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='zip_code'>Zip Code</label>
                    <input 
                        id='zip_code'
                        type='number' 
                        name='zip_code'
                        defaultValue={info.adescription4}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='country'>Country</label>
                    <input
                        id='country'
                        type='text' 
                        name='country'
                        defaultValue={info.adescription1}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input 
                        id='email'
                        type='email' 
                        name='email'
                        defaultValue={info.email}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='phone'>Phone</label>
                    <input 
                        id='phone'
                        type='number' 
                        name='phone'
                        defaultValue={info.phone}
                    />
                </div>


                <div className='form-group'>
                    <label htmlFor='tax_id'>Tax ID</label>
                    <input
                        id='tax_id'
                        type='number' 
                        name='tax_id'
                        defaultValue={info.ctax_id}
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