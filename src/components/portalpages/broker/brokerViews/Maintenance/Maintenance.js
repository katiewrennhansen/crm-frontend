import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AddIcon from '@material-ui/icons/Add';
import PageviewIcon from '@material-ui/icons/Pageview';

const endpoint = config.MAINTENANCE_PROVIDERS_ENDPOINT

class Maintenance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: null,
        };
    }

    setData = (data) => {
        const providers = data.providers
        this.setState({
            data: providers
        })
    }

    componentDidMount(){
        ApiService.getData(
            endpoint,
            this.setData
        )
    }

    render(){
        return (
            <div className='data-container'>
                <h2>Maintenance Providers</h2>
                <Link to='/broker/maintenance/add-provider' className='add-icon'>
                <AddIcon 
                    className="action-icon" 
                    aria-label="add comment type" 
                />
                </Link>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Company</th>
                            <th>Provider</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.data[0]) 
                            ? this.state.data.map(p => (
                            <tr key={p.data.id}>
                                <td>{p.data.typeservice}</td>
                                <td>{p.data.name}</td>
                                <td>{p.data.contact}</td>
                                <td>{p.data.email}</td>
                                <td>{p.data.phone}</td>
                                <td className='update'>
                                    <Link className="close-icon" to={`/broker/maintenance/${p.data.id}`}>
                                        <PageviewIcon />
                                    </Link>
                                </td>
                            </tr>
                            ))
                            : <tr>
                                <td className="nothing-to-display">No Providers to Display</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        }
                    </tbody>
                </table>
                <p className="entry-count">Showing {this.state.data.length} of {this.state.data.length} entries</p>
            </div>
        )
    }
}

export default Maintenance