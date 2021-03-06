import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import CustomerInfo from '../../../../utilities/CustomerComponents/CustomerInfo';

const caEndpoint = config.CUSTOMER_ACCOUNTS_ENDPOINT

class CustomerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false,
            customer: [],
            transfers: []
        };
    }

    setCustomer = customer => {
        this.setState({
            customer: customer
        })
    }

    setTransfers = transfers => {
        this.setState({
            transfers
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
        ApiService.getDataHalf(`${config.API_ENDPOINT}/customers/${id}/transfers`)
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
                        <Link className="close-icon" to='/dashboard/customer-accounts'>
                            <CloseIcon 
                                className="action-icon" 
                            />
                        </Link>
                        <Link className="add-icon" to={`/dashboard/customer-accounts/${data.id}/edit`}>
                            <EditIcon 
                                className="action-icon" 
                            />
                        </Link>
                    </div>
                </div>
                <CustomerInfo
                    data={data}
                    transfers={this.state.transfers}
                    url="dashboard/customer-accounts"
                />
            </div>
        )
    }
}

export default CustomerPage 