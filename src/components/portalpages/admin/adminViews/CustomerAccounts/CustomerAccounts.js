import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'
import './CustomerAccounts.css'


class CustomerAccounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false,
            customers: []
        };
    }

    setCustomers = customers => {
        this.setState({
            customers: customers,
            error: null
        })
    }

    componentDidMount(){
        fetch(config.CUSTOMER_ACCOUNTS_ENDPOINT, {
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
            this.setCustomers(data.customers)
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    addCustomer = (e) => {
        e.preventDefault()
        const newCustomer = {
            customer: {
                name: e.target.customer.value,
                email: e.target.customer_email.value,
                phone: e.target.customer_phone.value,
                dateCreated: this.props.formatDate(),
                company_id: 6,
                user_id: 1
            }
        }
        console.log(newCustomer)
        fetch(config.CUSTOMER_ACCOUNTS_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(newCustomer),
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
            this.setCustomers(data.customers)
            this.props.hideModal()
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
        const account = this.props.func
        return (
            <>
                <Modal show={account.show} >
                    <form 
                        className= 'add-content' 
                        onSubmit={(e) => this.addCustomer(e)}
                    >
                        <h3>Customer Accounts</h3>
                        <div className='form-group'>
                            <label htmlFor='feature_name'></label>
                            <TextInput 
                                id='customer'
                                name='customer'
                                label='Customer'
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
                        </div>
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <div className='cancel'>
                        <button onClick={account.hideModal}>Cancel</button>
                    </div>
                </Modal>
                <div className='data-container'>
                    <h3>Customer Accounts</h3>
                    <button className='add-data' onClick={account.showModal}>Add Customer</button>
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