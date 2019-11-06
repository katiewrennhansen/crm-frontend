import React, { Component } from 'react'
import cuuid from 'cuuid'
import ADMIN_DATA from '../../../../../admin-data'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'

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
        console.log('add new customer!!')
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
        ADMIN_DATA.customerAccounts.push(newCustomer)
        console.log(ADMIN_DATA.customerAccounts)
    }
    
    render(){  
        return (
            <>
                <Modal show={this.props.show} >
                    <form className= 'add_feature' onSubmit={(e) => {this.addCustomer(e); this.props.hideModal();}}>
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
                        <SubmitButton className='submit_property' text='Save'/>
                    </form>
                    <button onClick={this.props.hideModal}>Cancel</button>
                </Modal>
                <div className='promotion-container'>
                    <h3>Customer Accounts</h3>
                    <button className='add_promotion' onClick={this.props.showModal}>Add Customer</button>
                    <table className='promotion_table'>
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
                            {ADMIN_DATA.customerAccounts.map(c => {
                                const id = c.customer.id
                                const data = ADMIN_DATA.customerAccounts;
                                return (
                                    <tr key={id}>
                                        <td>{c.customer.name}</td>
                                        <td>{c.customer.email}</td>
                                        <td>{c.customer.phone}</td>
                                        <td>{c.customer.status}</td>
                                        <td><button>View</button></td>
                                        <td className='delete'><button onClick={() => {this.props.openDelete(id, data); this.props.showDelete()}}>Deactivate</button></td>
                                    </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default CustomerAccounts