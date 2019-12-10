import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'

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
            <div className='container'>
                <div className='header-grid'>
                    <h2>Maintenance</h2>
                    <Link to='/broker/maintenance/add-provider' className='add'>Add Provider</Link>
                </div>
                <div>
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
                            {this.state.data.map(p => (
                            
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
            </div>
        )
    }
}

export default Maintenance