import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import AdminContext from '../../../../../contexts/AdminContext'
import ApiService from '../../../../../services/api-service'
import ContactFrom from '../../../../utilities/Forms/ContactForm'
import CloseIcon from '@material-ui/icons/Close';

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
            adescription1: e.target.address.value,
            adescription2: e.target.city.value,
            adescription3: e.target.state.value,
            adescription4: e.target.zip_code.value,
            country: e.target.country.value,
            ctax: e.target.tax_id.value,
            broker_id: e.target.broker.value,
            cstatus_id: e.target.status.value,
            remainder_id: e.target.reminder.value,
            category_id: e.target.category.value,
            caniversary: e.target.anniversary.value,
            ccomment: e.target.comment.value,
            bank_id: e.target.bank_id.value,
            bankaccount: e.target.bankaccount.value,
            title: e.target.title.value,
            profession: e.target.profession.value,
            marital: e.target.marital.value,
            gender: e.target.gender.value,
            ctype: e.target.ctype.value
        }

        ApiService.postDataHalf(caEndpoint, newCustomer)
            .then(data => {
                ApiService.getDataHalf(caEndpoint)
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
                    <Link className='edit-btn edit-customer' to='/dashboard/customer-accounts'>
                        <CloseIcon 
                            className="add-icon" 
                        />
                    </Link>
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