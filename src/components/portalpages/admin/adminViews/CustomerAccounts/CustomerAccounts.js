import React, { Component } from 'react'
import cuuid from 'cuuid'
import ADMIN_DATA from '../../../../../admin-data'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import './CustomerAccounts.css'

let data = ADMIN_DATA.customerAccounts

class CustomerAccounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false
        };
    }

    addCustomer = (e) => {
        e.preventDefault()
        const newCustomer = {
            customer: {
                id: cuuid(),
                name: e.target.customer.value,
                email: e.target.customer_email.value,
                phone: e.target.customer_phone.value,
                dateCreated: this.props.formatDate(),
                company_id: 6,
                user_id: 1
            }
        }
        data.push(newCustomer)
    }


    deactivateCustomer = (id) => {
        const el = data.find(c => c.customer.id === id)
        const element = document.getElementById(id)
        const button = document.getElementById(`delete${id}`)

        if(el.customer.status === 'Active') {
            element.classList.add('deactivated')
            button.innerHTML = "Activate";
            el.customer.status = "Deactive"            
        } else {
            element.classList.remove('deactivated')
            button.innerHTML = "Deactivate";
            el.customer.status = "Active"  
        }
    }
    
    render(){  
        const account = this.props.func
        return (
            <>
                <Modal show={account.show} >
                    <form 
                        className= 'add-content' 
                        onSubmit={(e) => {this.addCustomer(e); account.hideModal();}}
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
                                <th>Phone</th>
                                <th>Status</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(c => {
                                const id = c.customer.id
                                return (
                                    <tr id={id} key={id}>
                                        <td>{c.customer.name}</td>
                                        <td>{c.customer.email}</td>
                                        <td>{c.customer.phone}</td>
                                        <td>{c.customer.status}</td>
                                        <td className='update'>
                                            <button>View</button>
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