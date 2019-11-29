import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'
import './CustomerAccounts.css'
import AdminContext from '../../../../../contexts/AdminContext'
import ApiService from '../../../../../services/api-service'

const caEndpoint = config.CUSTOMER_ACCOUNTS_ENDPOINT
const brokerEndpoint = config.BROKER_ENDPOINT
const csEndpoint = config.CUSTOMER_STATUS_ENDPOINT
const remindersEndpoint = config.REMINDERS_ENDPOINT
const catEndpoint = config.CATEGORIES_ENDPOINT

class EditCustomer extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            brokers: [],
            status: [],
            reminders: [],
            categories: []
        };
    }

    setCustomers = data => {
        const customers = data.customers
        this.setState({
            customers: customers,
            error: null
        })
    }

    setBrokers = data => {
        this.setState({
            brokers: data.brokers,
            error: null
        })
    }

    setStatus = data => {
        this.setState({
            status: data,
            error: null
        })
    }

    setReminders = data => {
        this.setState({
            reminders: data,
            error: null
        })
    }

    setCategories = data => {
        this.setState({
            categories: data,
            error: null
        })
    }

    componentDidMount(){
        ApiService.getData(
            brokerEndpoint,
            this.setBrokers
        )
        ApiService.getData(
            csEndpoint,
            this.setStatus
        )
        ApiService.getData(
            remindersEndpoint,
            this.setReminders
        )
        ApiService.getData(
            catEndpoint,
            this.setCategories
        )
    }

    editCustomer = (e) => {
        e.preventDefault()
        const id = this.props.id
        let updatedCustomer = {}
        const updatedCustomerFields = {
            firstname: e.target.first_name.value,
            lastname: e.target.last_name.value,
            cemail: e.target.email.value,
            phone: e.target.phone.value,
            adescription1: e.target.address1.value,
            adescription2: e.target.address2.value,
            country: e.target.country.value,
            ctax: e.target.tax_id.value,
            broker_id: e.target.broker.value,
            cstatus_id: e.target.status.value,
            remainder_id: e.target.reminder.value,
            category_id: e.target.category.value,
            caniversary: e.target.anniversary.value,
            ccomment: e.target.comment.value
        }

        for (const key in updatedCustomerFields) {
            if (updatedCustomerFields[key] !== '')
                updatedCustomer[key] = updatedCustomerFields[key]
            }

        console.log(updatedCustomer, id)

        // ApiService.postDataHalf(caEndpoint, updatedCustomer)
        //     .then(data => {
        //         console.log(data)
        //         ApiService.getDataHalf(caEndpoint)
        //             .then(data => {
        //                 this.setCustomers(data.customers)
        //             })
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        this.props.func.history.push(`/dashboard/customer-accounts/${id}`)
    }

    render(){  
        return (
            <div className='add-customer'>
                <h2>Edit Customer</h2>
                    <form 
                        className= 'add-customer-form' 
                        onSubmit={(e) => this.editCustomer(e)}
                    >
                        <div className='add-customer-form-group'>
                            <TextInput 
                                id='first_name'
                                name='first_name'
                                label='First Name'
                                type='text'
                                autoComplete='text'
                            />
                            <TextInput 
                                id='last_name'
                                name='last_name'
                                label='Last Name'
                                type='text'
                                autoComplete='text'
                            />
                            <TextInput 
                                id='customer_email'
                                name='email'
                                label='Email'
                                type='email'
                                autoComplete='text'
                            />
                            <TextInput 
                                id='customer_phone'
                                name='phone'
                                label='Phone'
                                type='text'
                                autoComplete='text'
                            />
                            <TextInput 
                                id='address1'
                                name='address1'
                                label='Address Line 1'
                                type='text'
                                autoComplete='text'
                            />
                            <TextInput 
                                id='address2'
                                name='address2'
                                label='Address Line 2'
                                type='text'
                                autoComplete='text'
                            />
                            <TextInput 
                                id='country'
                                name='country'
                                label='Country'
                                type='text'
                                autoComplete='text'
                            />
                            <TextInput 
                                id='tax_id'
                                name='tax_id'
                                label='Tax ID'
                                type='text'
                                autoComplete='text'
                            />
                            <div className='select-container'>
                                <select name='broker'>
                                    <option value="">Select a Broker</option>
                                    {this.state.brokers.map(broker => 
                                            (<option 
                                                key={broker.data.id} 
                                                value={broker.data.id}
                                            >
                                                {broker.data.name}
                                            </option>)
                                        )
                                    }
                                </select>
                            </div>
                            <div className='select-container'>
                                <select name='status'>
                                    <option value="">Select a Status</option>
                                    {this.state.status.map(s => 
                                            (<option 
                                                key={s.id} 
                                                value={s.id}
                                            >
                                                {s.csdesc}
                                            </option>)
                                        )
                                    }
                                </select>
                            </div>
                            <div className='select-container'>
                                <select name='reminder'>
                                    <option value="">Select a Reminder</option>
                                    {this.state.reminders.map(r => 
                                            (<option 
                                                key={r.id} 
                                                value={r.id}
                                            >
                                                {r.rtype}
                                            </option>)
                                        )
                                    }
                                </select>
                            </div>
                            <div className='select-container'>
                                <select name="category">
                                    <option value="">Select a Category</option>
                                    {this.state.categories.map(c => 
                                            (<option 
                                                key={c.id} 
                                                value={c.id}
                                            >
                                                {c.ccategdesc}
                                            </option>)
                                        )
                                    }
                                </select>
                            </div>
                            <TextInput 
                                id='anniversary'
                                name='anniversary'
                                label='Anniversary'
                                type='text'
                                autoComplete='text'
                            />
                            <TextInput 
                                id='comment'
                                name='comment'
                                label='Comment'
                                type='text'
                                autoComplete='text'
                            />
                        <div className='cancel'>
                            <Link className='cancel-btn' to='/dashboard/customer-accounts'>Cancel</Link>
                        </div>
                        <SubmitButton className='submit-content' type='submit' text='Save'/>
                        </div>
                    </form>
                    
                </div>
        )
    }
}

export default EditCustomer