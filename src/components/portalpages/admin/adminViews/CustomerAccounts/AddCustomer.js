import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import AdminContext from '../../../../../contexts/AdminContext'
import ApiService from '../../../../../services/api-service'
import ContactFrom from '../../../../utilities/Forms/ContactForm'

const caEndpoint = config.CUSTOMER_ACCOUNTS_ENDPOINT

class AddCustomer extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
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
                    .then(() => {
                        this.props.func.history.push('/dashboard/customer-accounts')
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){  
        return (
            <div className='add-customer'>
                <div className='header-grid'>
                    <h2>Add Customer</h2>
                    <Link className='cancel-btn' to='/dashboard/customer-accounts'>Cancel</Link>
                </div>

                <ContactFrom 
                    handleSubmit={this.addCustomer}
                    cust={[]}
                />
                    
            </div>
        )
    }
}

export default AddCustomer