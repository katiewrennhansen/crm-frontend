import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import ProviderInfo from '../../../../utilities/CustomerComponents/ProviderInfo';
import TokenService from '../../../../../services/token-service';

class Provider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            customer: []
        };
    }

    setCustomer = customer => {
        this.setState({
            customer
        })
    }

    componentDidMount(){
        fetch(`${config.API_ENDPOINT}/providers/${this.props.id}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => (!res.ok) ? res.json().then(error => Promise.reject(error)) : res.json())
        .then(data => this.setCustomer(data.data))
        .catch(error => this.setState({ error }))
    }

    addCustomer = (e) => {
        e.preventDefault()
        const newCustomer = {
            customer: {
                name: e.target.customer.value,
                email: e.target.customer_email.value,
                phone: e.target.customer_phone.value,
                dateCreated: this.props.formatDate()
            }
        }
        fetch(config.CUSTOMER_ACCOUNTS_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => (!res.ok) ? res.json().then(error => Promise.reject(error)) : res.json())
        .then(data => {
            this.setCustomers(data.customers)
            this.props.hideModal()
        })
        .catch(error => this.setState({ error }))
    }
    
    render(){  
        const data = this.state.customer
        return (
            <div className='container contact-container'>
                <div className='header-grid'>
                    <h2>{data.name}</h2>
                    <div className="property-icons">
                        <Link to='/broker/maintenance/' className="close-icon">
                            <CloseIcon
                                className="action-icon" 
                            />
                        </Link>
                        <Link to={`/broker/maintenance/${this.props.id}/edit`} className="add-icon">
                            <EditIcon
                                className="action-icon" 
                            />
                        </Link>
                    </div>
                </div>
                <ProviderInfo 
                    data={data}
                />
            </div>
        )
    }
}

export default Provider