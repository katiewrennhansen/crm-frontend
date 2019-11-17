import React, { Component } from 'react'
import config from '../../../../../config'
import './CustomerAccounts.css'


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
        fetch(`${config.CUSTOMER_ACCOUNTS_ENDPOINT}/${this.props.id}`, {
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
            this.setCustomer(data.data)
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
    
    render(){  
        const data = this.state.customer
        return (
            <>
                <div className='data-container'>
                    <h3>FirstName Last Name</h3>
                    <button className='add-data'>Edit Customer</button>
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