import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'
import './CustomerAccounts.css'
import AdminContext from '../../../../../contexts/AdminContext'
import ApiService from '../../../../../services/api-service'

const caEndpoint = config.CUSTOMER_ACCOUNTS_ENDPOINT
const brokerEndpoint = config.BROKER_ENDPOINT

class CustomerAccounts extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            brokers: []
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

    componentDidMount(){
        ApiService.getData(
            caEndpoint, 
            this.setCustomers
        )
        ApiService.getData(
            brokerEndpoint,
            this.setBrokers
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


    deactivateCustomer = (id) => {
        const el = this.state.customers.find(c => c.data.id === id)
        const element = document.getElementById(id)
        const button = document.getElementById(`delete${id}`)

        if(el.data.status === 'On hold') {
            element.classList.add('deactivated')
            button.innerHTML = "Activate";
            el.data.status = "Deactive"            
        } else {
            element.classList.remove('deactivated')
            button.innerHTML = "Deactivate";
            el.data.status = 'On hold'  
        }
    }
    
    render(){  
        const context = this.context
        return (
            <>
                <Modal show={context.show} >
                    <form 
                        className= 'add-content' 
                        onSubmit={(e) => this.addCustomer(e)}
                    >
                        <h3>Customer Accounts</h3>
                        <div className='form-group'>
                            <label htmlFor='feature_name'></label>
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
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <div className='cancel'>
                        <button onClick={context.hideModal}>Cancel</button>
                    </div>
                </Modal>
                <div className='data-container'>
                    <h3>Customer Accounts</h3>
                    <button className='add-data' onClick={context.showModal}>Add Customer</button>
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.customers.map(c => {
                                const id = c.data.id
                                return (
                                    <tr id={id} key={id}>
                                        <td>{c.data.name}</td>
                                        <td>{c.data.email}</td>
                                        <td>{c.data.category}</td>
                                        <td>{c.data.status}</td>
                                        <td className='update'>
                                            <Link to={`/dashboard/customer-accounts/${id}`}>View</Link>
                                        </td>
                                        <td className='delete'>
                                            <button 
                                                className='delete' 
                                                id={`delete${id}`} 
                                                onClick={() => this.deactivateCustomer(id)}
                                            >
                                                Deactivate
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default CustomerAccounts