import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service';
import AddNetwork from './components/AddNetwork';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import CustomerInfo from '../../../../utilities/CustomerComponents/CustomerInfo';


class ContactPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: [],
            transfers: []
        };
    }

    setCustomer = customer => {
        this.setState({
            customer: customer,
            error: null
        })
    }


    setTransfers = transfers => {
        this.setState({
            transfers
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/customers`
        const id = this.props.id
        ApiService.getById(endpoint, id)
            .then(data => {
                this.setCustomer(data.data)
            })
            .catch(error => {
                this.setState({ error })
            })
        ApiService.getDataHalf(`${endpoint}/${id}/transfers`)
            .then(data => {
                this.setTransfers(data.transfers)
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    componentWillUnmount(){
        this.setCustomer([])
    }

    
    render(){  
        const data = this.state.customer
        return (
            <div className='container contact-container'>
                <div className='header-grid'>
                    <h2>{data.name}</h2>
                    <div className="property-icons">               
                        <Link className="close-icon" to='/broker/contacts'>
                            <CloseIcon 
                                className="action-icon" 
                            />
                        </Link>
                        <Link className="add-icon" to={`/broker/contacts/${this.props.id}/edit`}>
                            <EditIcon 
                                className="action-icon" 
                            />
                        </Link>
                    </div>
                </div>
                <CustomerInfo
                    data={data}
                    transfers={this.state.transfers}
                    url="broker/contacts"
                />
                <AddNetwork 
                    id={this.props.id}
                    name={data.name}
                />
            </div>
        )
    }
}

export default ContactPage