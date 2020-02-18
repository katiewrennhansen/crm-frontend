import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import AdminContext from '../../../../../contexts/AdminContext'
import ApiService from '../../../../../services/api-service'
import ContactForm from '../../../../utilities/Forms/ContactForm'
import CloseIcon from '@material-ui/icons/Close';

const caEndpoint = config.CUSTOMER_ACCOUNTS_ENDPOINT

class EditCustomer extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
        };
    }

    setCustomer = customers => {
        this.setState({
            customers
        })
    }

    componentDidMount(){
        const id = this.props.id
        ApiService.getById(caEndpoint, id)
            .then(data => {
                this.setCustomer(data.data)
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    editCustomer = (e) => {
        e.preventDefault()
        const id = this.props.id
        let updatedCustomer = {}
        const updatedFields = {
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
            bankaccount: e.target.bankaccount.value
        }

        for (const key in updatedFields) {
            if (updatedFields[key] !== '')
                updatedCustomer[key] = updatedFields[key]
        }

        ApiService.updateDataHalf(caEndpoint, id, updatedCustomer)
            .then(data => {
                ApiService.getDataHalf(caEndpoint)
                    .then(data => {
                        this.setCustomer(data.customers)
                    })
                    .then(() => {
                        this.props.func.history.push(`/dashboard/customer-accounts/${id}`)
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
                    <h2>Edit Customer</h2>
                    <Link to={`/dashboard/customer-accounts/${this.props.id}`} className='edit-btn edit-customer'>
                        <CloseIcon 
                            className="add-icon" 
                        />
                    </Link>
                </div>

                <ContactForm
                    cust={this.state.customers}
                    handleSubmit={this.editCustomer}
                />
            </div>
        )
    }
}

export default EditCustomer