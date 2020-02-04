import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import CloseIcon from '@material-ui/icons/Close';


class EditSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: [],
            error: null
        };
    }

    setCompanyInfo = company => {
        this.setState({
            company
        })
    }

    componentDidMount(){
        ApiService.getDataHalf(`${config.API_ENDPOINT}/companies`)
            .then(data => {
                this.setCompanyInfo(data.companies[0].data)
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
            cianame: company_name.value,
            ccontact: contact.value,
            adescription1: address.value,
            cemail: email.value,
            cphone: phone.value,
            adescription2: country.value,
            ctaxinfo: tax_id.value
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
        const info = this.state.company
        return (
            <div className='edit-company'>
                <div className="header-grid">
                    <h2>Edit {info.company}</h2>
                    <Link to='/dashboard/company-setup' className='edit-btn edit-customer'>
                        <CloseIcon 
                            className="add-icon" 
                        />
                    </Link>
                </div>
                <form className="edit-company-form edit-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="inner-form-content">
                        <p>Please fill out all forms marked with an <span className="required">*</span></p>
                        <div className="form-content-section">
                            <h3>Company Information</h3>
                            <div className='form-group'>
                                <label htmlFor='company_name'>Company Name<span className="required">*</span></label>
                                <input
                                    type="text"
                                    id="company_name"
                                    name='company_name'
                                    defaultValue={info.company}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='contact'>Contact<span className="required">*</span></label>
                                <input 
                                    id='contact'
                                    type='text'
                                    name='contact'
                                    defaultValue={info.contact}
                                />
                            </div>

                            <div className='form-group row'>
                                <div>
                                    <label htmlFor='phone'>Phone<span className="required">*</span></label>
                                    <input 
                                        id='phone'
                                        type='number' 
                                        name='phone'
                                        defaultValue={info.phone}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='email'>Email<span className="required">*</span></label>
                                    <input 
                                        id='email'
                                        type='email' 
                                        name='email'
                                        defaultValue={info.email}
                                    />
                                </div>
                            </div>            
                        </div>

                        <div className="form-content-section">
                            <h3>Address</h3>
                            <div className='form-group'>
                                <label htmlFor='address'>Address<span className="required">*</span></label>
                                <input 
                                    id='address'
                                    type='text' 
                                    name='address'
                                    defaultValue={info.adescription3}
                                />
                            </div>

                            <div className='form-group row'>
                                <div>
                                    <label htmlFor='city'>City<span className="required">*</span></label>
                                    <input 
                                        id='city'
                                        type='text' 
                                        name='city'
                                        defaultValue={info.adescription2}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='city'>State<span className="required">*</span></label>
                                    <input 
                                        id='state'
                                        type='text' 
                                        name='state'
                                        defaultValue={info.adescription5}
                                    />
                                </div>
                            </div>

                            <div className='form-group row'>
                                <div>
                                    <label htmlFor='zip_code'>Zip Code<span className="required">*</span></label>
                                    <input 
                                        id='zip_code'
                                        type='number' 
                                        name='zip_code'
                                        defaultValue={info.adescription4}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='country'>Country<span className="required">*</span></label>
                                    <input
                                        id='country'
                                        type='text' 
                                        name='country'
                                        defaultValue={info.adescription1}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-content-section">
                            <h3>Additional Information</h3>
                            <div className='form-group'>
                                <label htmlFor='tax_id'>Tax ID<span className="required">*</span></label>
                                <input
                                    id='tax_id'
                                    type='text' 
                                    name='tax_id'
                                    defaultValue={info.ctax_id}
                                />
                            </div>
                        </div>

                        <input
                            type="submit"
                            className="submit"
                            value="Save"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default EditSettings