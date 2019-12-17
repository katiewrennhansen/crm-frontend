import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AddIcon from '@material-ui/icons/Add';

class Maintenance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            requests: [],
        };
    }

    setRequests = requests => {
        this.setState({
            requests
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/asset/0/assetcomments`
        ApiService.getData(
            endpoint,
            this.setData
        )
    }

    render(){
        return (
            <div className='data-container'>
                <h2>Maintenance</h2>
                <Link to='/user/maintenance/request-maintentance' className='add-icon'>
                <AddIcon 
                    fontSize="large" 
                    aria-label="add comment type" 
                />
                </Link>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Provider</th>
                            <th>Type</th>
                            <th>Company</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.requests.map(p => (
                        
                        <tr key={p.data.id}>
                            <td>
                                <Link to={`/broker/maintenance/${p.data.id}`}>
                                    {p.data.contact}
                                </Link>
                            </td>
                            <td>{p.data.typeservice}</td>
                            <td>{p.data.name}</td>
                            <td>{p.data.email}</td>
                            <td>{p.data.phone}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Maintenance