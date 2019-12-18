import React, { Component } from 'react'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'

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
        const endpoint = `${config.API_ENDPOINT}/assets/0/maintenances`
        ApiService.getData(
            endpoint,
            this.setData
        )
    }

    render(){
        return (
            <div className='data-container'>
                <h2>Maintenance Requests</h2>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Requestor</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Date Requested</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.requests.map(p => (
                        
                        <tr key="">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Maintenance