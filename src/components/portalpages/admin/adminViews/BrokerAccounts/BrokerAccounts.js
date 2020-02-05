import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import AdminContext from '../../../../../contexts/AdminContext'
import ApiService from '../../../../../services/api-service'
import AddIcon from '@material-ui/icons/Add';
import PageviewIcon from '@material-ui/icons/Pageview';

class BrokerAccounts extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            brokers: []
        };
    }

    setBrokers = brokers => {
        this.setState({
            brokers
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/brokers`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setBrokers(data.brokers)
            })
            .catch(error => console.log(error))
    }

    render(){  
        return (
            <div className='data-container'>
                <h2>Broker Accounts</h2>
                <Link className="add-icon" to='/dashboard/broker-accounts/add'>
                    <AddIcon 
                        aria-label="add comment type" 
                    />
                </Link>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.brokers[0])
                            ? this.state.brokers.map(c => {
                                return (
                                    <tr key={c.data.id}>
                                        <td>{c.data.name}</td>
                                        <td>{c.data.email}</td>
                                        <td>{c.data.phone}</td>
                                        <td >
                                            <Link className="view" to={`/dashboard/broker-accounts/${c.data.id}`}>
                                                <PageviewIcon />
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                            : <tr>
                                <td className="nothing-to-display">No Customers to Display</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        }
                    </tbody>
                </table>
                <p className="entry-count">Showing {this.state.brokers.length} of {this.state.brokers.length} entries</p>
            </div>
        )
    }
}

export default BrokerAccounts