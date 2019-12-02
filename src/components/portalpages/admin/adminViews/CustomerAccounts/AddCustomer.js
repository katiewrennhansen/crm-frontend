import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
            firstname: e.target.first_name.value,
            lastname: e.target.last_name.value,
            cemail: e.target.email.value,
            cemail2: e.target.email_alt.value,
            phone: e.target.phone.value,
            adescription4: e.target.address.value,
            adescription3: e.target.city.value,
            adescription2: e.target.state.value,
            adescription1: e.target.zip_code.value,
            country: e.target.country.value,
            ctax: e.target.tax_id.value,
            broker_id: e.target.broker.value,
            cstatus_id: e.target.status.value,
            remainder_id: e.target.reminder.value,
            category_id: e.target.category.value,
            caniversary: e.target.anniversary.value,
            ccomment: e.target.comment.value
        }

        console.log(newCustomer)

        ApiService.postDataHalf(caEndpoint, newCustomer)
            .then(data => {
                console.log(data)
                ApiService.getDataHalf(caEndpoint)
                    .then(data => {
                        this.setCustomers(data.customers)
                    })
            })
            .catch(error => {
                console.log(error)
            })
        this.props.func.history.push('/dashboard/customer-accounts')
    }

    render(){  
        return (
            <div className='add-customer'>
                <div className='header-grid'>
                    <h2>Add Customer</h2>
                    <Link className='cancel-btn' to='/dashboard/customer-accounts'>Cancel</Link>
                </div>
                    <form 
                        className= 'add-customer-form' 
                        onSubmit={(e) => this.addCustomer(e)}
                    >
                        <div className='add-customer-form-group'>
                            <div className='form-group'>
                                <label htmlFor='first_name'>First Name:</label>
                                <input
                                    id='first_name'
                                    name='first_name'
                                    type='text'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='last_name'>Last Name:</label>
                                <input
                                    id='last_name'
                                    name='last_name'
                                    type='text'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='email'>Email:</label>
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='email_alt'>Alternate Email:</label>
                                <input
                                    id='email_alt'
                                    name='email_alt'
                                    type='email'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='phone'>Phone:</label>
                                <input
                                    id='phone'
                                    name='phone'
                                    type='number'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='address'>Address:</label>
                                <input
                                    id='address'
                                    name='address'
                                    type='text'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='city'>City:</label>
                                <input
                                    id='city'
                                    name='city'
                                    type='text'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='state'>State:</label>
                                <input
                                    id='state'
                                    name='state'
                                    type='text'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='zip_code'>Zip Code:</label>
                                <input
                                    id='zip_code'
                                    name='zip_code'
                                    type='text'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='country'>Country:</label>
                                <input
                                    id='country'
                                    name='country'
                                    type='text'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tax_id'>Tax ID:</label>
                                <input
                                    id='tax_id'
                                    name='tax_id'
                                    type='number'
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='broker'>Broker:</label>
                                <select name='broker'>
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
                            <div className='form-group'>
                                <label htmlFor='status'>Status:</label>
                                <select name='status'>
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
                            <div className='form-group'>
                            <label htmlFor='reminder'>Reminder:</label>
                                <select name='reminder'>
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
                            <div className='form-group'>
                                <label htmlFor='category'>Category:</label>
                                <select name="category">
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
                            <div className='form-group'>
                                <label htmlFor='anniversary'>Anniversary:</label>
                                <input
                                    id='anniversary'
                                    name='anniversary'
                                    type='date'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='comment'>Comment:</label>
                                <textarea
                                    id='comment'
                                    name='comment'
                                >
                                </textarea>
                            </div>
                        
                        <input type='submit' className='submit' text='Save'/>
                        </div>
                    </form>
                    
                </div>
        )
    }
}

export default AddCustomer