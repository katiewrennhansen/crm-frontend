import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import BrokerInfo from '../../../../utilities/CustomerComponents/BrokerInfo';

class BrokerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            broker: []
        };
    }

    setCustomer = broker => {
        this.setState({
            broker
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/brokers`
        const id = this.props.id
        ApiService.getById(endpoint, id)
            .then(data => {
                this.setCustomer(data.data)
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    addCustomer = (e) => {
        const endpoint = `${config.API_ENDPOINT}/brokers`
        e.preventDefault()
        const newCustomer = {
            customer: {
                name: e.target.customer.value,
                email: e.target.customer_email.value,
                phone: e.target.customer_phone.value,
                dateCreated: this.props.formatDate()
            }
        }
        ApiService.postDataHalf(endpoint, newCustomer)
        .then(data => {
            this.setCustomers(data.customers)
            this.props.hideModal()
        })
        .catch(error => {
            this.setState({ error })
        })
    }
    
    render(){  
        const data = this.state.broker
        return (
            <div className='container contact-container'>
                <div className='header-grid'>
                    <h2>{data.name}</h2>
                    <div className="property-icons">               
                        <Link className="close-icon" to='/dashboard/broker-accounts'>
                            <CloseIcon 
                                className="action-icon" 
                            />
                        </Link>
                        <Link className="add-icon" to={`/dashboard/broker-accounts/${data.id}/edit`}>
                            <EditIcon 
                                className="action-icon" 
                            />
                        </Link>
                    </div>
                </div>
                <BrokerInfo
                    data={data}
                    url="dashboard/broker-accounts"
                />
            </div>
        )
    }
}

export default BrokerPage 