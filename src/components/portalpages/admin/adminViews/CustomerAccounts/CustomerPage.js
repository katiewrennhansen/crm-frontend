import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import './CustomerAccounts.css'
import ApiService from '../../../../../services/api-service';

const caEndpoint = config.CUSTOMER_ACCOUNTS_ENDPOINT

class CustomerAccounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false,
            customer: []
        };
    }

    setCustomer = customer => {
        this.setState({
            customer: customer,
            error: null
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

    componentWillUnmount(){
        this.setCustomer([])
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
        ApiService.postDataHalf(caEndpoint, newCustomer)
        .then(data => {
            this.setCustomers(data.customers)
            this.props.hideModal()
        })
        .catch(error => {
            this.setState({ error })
        })
    }
    
    render(){  
        const data = this.state.customer
        return (
            <>
                <div className='data-container'>
                    <h3>{data.name}</h3>
                    <Link 
                        to={`/dashboard/customer-accounts/${data.id}/edit`}
                        className='add-data'
                    >Edit Customer
                    </Link>
                    <div>
                        <p>{data.email}</p>
                        <br></br>
                        <p>{data.adescription4}</p>
                        <p>{`${data.adescription2}, ${data.adescription3}`}</p>
                        <p>{data.adescription1}</p>
                        <br></br>
                        <p>Category: {data.category}</p>
                        <p>Status: {data.status}</p>
                        <p>Tax ID: {data.taxid}</p>
                        <p>Broker: {data.broker}</p>
                        <p>Reminder: {data.remainder}</p>
                    </div>
                </div>
            </>
        )
    }
}

export default CustomerAccounts