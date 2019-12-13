import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import CloseIcon from '@material-ui/icons/Close';


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
        const endpoint = `${config.API_ENDPOINT}/companies`
        const { company_name, contact, address, email, phone, country, tax_id } = e.target
        const id = 6
        let updatedInfo = {}
        let updatedFields = {
            company: company_name.value,
            contact: contact.value,
            adescription1: address.value,
            email: email.value,
            phone: phone.value,
            adescription2: country.value,
            ctax_id: tax_id.value
        }

        for (const key in updatedFields) {
            if (updatedFields[key] !== '')
                updatedInfo[key] = updatedFields[key]
        }

        ApiService.updateDataHalf(endpoint, id, updatedInfo)
            .then(data => {
                console.log(data)
                this.props.history.push('/dashboard/company-setup')
            })
            .then(error => {
                console.log(error)
            })
    }


    render(){
        const info = this.state.companyInfo
        return (
            <div className='edit-company'>
                <div className="header-grid">
                    <h3>Edit Company Information</h3>
                    <Link to='/dashboard/company-setup' className='edit-btn edit-customer'>
                        <CloseIcon 
                            className="add-icon" 
                            fontSize="large" 
                        />
                    </Link>
                </div>
                <form className="edit-company-form edit-form" onSubmit={(e) => this.handleSubmit(e)}>

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
                <input
                    type="submit"
                    className="submit-full"
                    value="Save"
                />
            </form>
        </div>
          
        )
    }
}

export default EditSettings