import React, { Component } from 'react'
import config from '../../../../../config'


class Provider extends Component {
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
        fetch(`${config.MAINTENANCE_PROVIDERS_ENDPOINT}/${this.props.id}`, {
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
                    <h3>{data.contact}</h3>
                    <button className='add-data'>Edit Provider</button>
                    <div>
                        <p>{data.typeservice}</p>
                        <p>{data.email}</p>
                        <p>{data.phone}</p>
                        <br></br>
                        <h4>{data.name}</h4>
                        <p>{data.adescription4}</p>
                        <p>{`${data.adescription2}, ${data.adescription3}`}</p>
                        <p>{data.adescription1}</p>
                        <br></br>
                        <p>Category: {data.category}</p>
                        <p>Status: {data.status}</p>
                        <p>Tax ID: {data.taxid}</p>
                        <br></br>
                        <h4>Comments</h4>
                        <p>{data.comment}</p>
                    </div>
                </div>
            </>
        )
    }
}

export default Provider