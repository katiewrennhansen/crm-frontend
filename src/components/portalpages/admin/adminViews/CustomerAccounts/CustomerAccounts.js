import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import AdminContext from '../../../../../contexts/AdminContext'
import ApiService from '../../../../../services/api-service'
import AddIcon from '@material-ui/icons/Add';
import PageviewIcon from '@material-ui/icons/Pageview';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const caEndpoint = config.CUSTOMER_ACCOUNTS_ENDPOINT
const brokerEndpoint = config.BROKER_ENDPOINT

class CustomerAccounts extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            brokers: []
        };
    }

    setCustomers = data => {
        const customers = data.customers
        this.setState({
            customers: customers,
            error: null
        })
    }

    setBrokers = data => {
        this.setState({
            brokers: data.brokers,
            error: null
        })
    }

    componentDidMount(){
        ApiService.getData(
            caEndpoint, 
            this.setCustomers
        )
        ApiService.getData(
            brokerEndpoint,
            this.setBrokers
        )
    }

    componentWillUnmount(){
        this.setCustomers([])
    }


    deactivateCustomer = (id) => {
        const updatedStatus = {
            cstatus_id: 35
        }

        ApiService.updateDataHalf(caEndpoint, id, updatedStatus)
            .then(data => {
                ApiService.getDataHalf(caEndpoint)
                    .then(data => {
                        this.setCustomers(data)
                    })
            })
            .catch(error => {
                console.log(error)
            })

        const el = this.state.customers.find(c => c.data.id === id)
        const element = document.getElementById(id)
        const button = document.getElementById(`delete${id}`)

        if(el.data.status === 'On hold') {
            element.classList.add('deactivated')
            button.innerHTML = "Activate";
            el.data.status = "Deactive"            
        } else {
            element.classList.remove('deactivated')
            button.innerHTML = "Deactivate";
            el.data.status = 'On hold'  
        }
    }
    
    render(){  
        return (
                <div className='data-container'>
                    <h2>Customer Accounts</h2>
                    <Link className="add-icon" to='/dashboard/add-customer'>
                        <AddIcon 
                            aria-label="add comment type" 
                        />
                    </Link>
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>View</th>
                                <th>Deactivate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(this.state.customers[0])
                                ? this.state.customers.map(c => {
                                    const id = c.data.id
                                    return (
                                        <tr id={id} key={id}>
                                            <td>{c.data.name}</td>
                                            <td>{c.data.email}</td>
                                            <td>{c.data.category}</td>
                                            <td>{c.data.status}</td>
                                            <td >
                                                <Link className="view" to={`/dashboard/customer-accounts/${id}`}>
                                                    <PageviewIcon />
                                                </Link>
                                            </td>
                                            <td>
                                                <button 
                                                    className='delete-btn' 
                                                    id={`delete${id}`} 
                                                    onClick={() => this.deactivateCustomer(id)}
                                                >
                                                    <NotInterestedIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                                : <tr>
                                    <td className="nothing-to-display">No Customers to Display</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            }
                        </tbody>
                    </table>
                    <p className="entry-count">Showing {this.state.customers.length} of {this.state.customers.length} entries</p>
                </div>
        )
    }
}

export default CustomerAccounts