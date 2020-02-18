import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import ContactFrom from '../../../../utilities/Forms/ContactForm'
import CloseIcon from '@material-ui/icons/Close';

class AddContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: []
        };
    }

    setCustomer = customers => {
        this.setState({
            customers
        })
    }

    componentDidMount(){
        const id = this.props.id
        const endpoint = `${config.API_ENDPOINT}/customers`
        ApiService.getById(endpoint, id)
            .then(data => {
                this.setCustomer(data.data)
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    addContact = (e) => {
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
            ccomment: e.target.comment.value
        }
        const endpoint = `${config.API_ENDPOINT}/customers`
        ApiService.postDataHalf(endpoint, newCustomer)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setCustomer(data.customers)
                        this.props.history.push(`/broker/contacts`)
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
                    <h2>Add Contact</h2>
                    <Link className="close-icon"  to={`/broker/contacts`}>
                        <CloseIcon
                            className="action-icon" 
                        />
                    </Link>
                </div>
                
                <ContactFrom 
                    handleSubmit={this.addContact}
                    cust={[]}
                />
            </div>
        )
    }
}

export default AddContact