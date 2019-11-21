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

class AddCustomer extends Component {
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

    addCustomer = (e) => {
        e.preventDefault()
        const newCustomer = {
            customer: {
                name: e.target.customer.value,
                email: e.target.customer_email.value,
                phone: e.target.customer_phone.value,
                dateCreated: new Date(),
            }
        }
        ApiService.postDataHalf(caEndpoint, newCustomer)
            .then(data => {
                this.setCustomers(data.customers)
                this.context.hideModal()
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    render(){  
        const context = this.context
        return (
            <>
                <h2>Add Customer</h2>
                    <form 
                        className= 'add-customer' 
                        onSubmit={(e) => this.addCustomer(e)}
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
                                name='customer_email'
                                label='Email'
                                type='email'
                                autoComplete='text'
                            />
                            <TextInput 
                                id='customer_phone'
                                name='customer_phone'
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
                                <select>
                                    <option>Select a Broker</option>
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
                                <select>
                                    <option>Select a Status</option>
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
                                <select>
                                    <option>Select a Reminder</option>
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
                                <select>
                                    <option>Select a Category</option>
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
                        </div>
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <div className='cancel'>
                        <button><Link to='/dashboard/customer-accounts'>Cancel</Link></button>
                    </div>
                </>
        )
    }
}

export default AddCustomer