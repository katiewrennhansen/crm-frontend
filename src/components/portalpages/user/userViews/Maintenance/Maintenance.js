import React, { Component } from 'react'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'

class Maintenance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            requests: [],
            mainttypes: [],
            assets: []
        };
    }

    setRequests = requests => {
        this.setState({
            requests
        })
    }

    setMainttypes = mainttypes => {
        this.setState({
            mainttypes
        })
    }

    setAssets = assets => {
        this.setState({
            assets
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets/0/maintenances`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                if(data.maintenances){
                    this.setRequests(data.maintenances)
                    const maint = `${config.API_ENDPOINT}/mainttypes`
                    ApiService.getDataHalf(maint)
                        .then(data => {
                            this.setMainttypes(data)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            })
            .catch(error => {
                console.log(error)
            })
        
        const assets = `${config.API_ENDPOINT}/assets`
        ApiService.getDataHalf(assets)
            .then(data => {
                this.setAssets(data.assets)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return (
            <div className='data-container'>
                <h2>Maintenance Requests</h2>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Provider</th>
                            <th>Type</th>
                            <th>Cost</th>
                            <th>Date Requested</th>
                            <th>Deliver Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.requests[0])
                        ? this.state.requests.map(p => (
                        <tr key={p.data.id}>
                            <td>{this.state.assets.map(a => (a.data.id === p.data.asset_id) ? a.data.adescription4 : null)}</td>
                            <td>{p.data.provider}</td>
                            <td>{p.data.maintcomm}</td>
                            <td>${p.data.initialcost}</td>
                            <td>{p.data.reqdate}</td>
                            <td>{(p.data.deliverdate) ? p.data.deliverdate : '-' }</td>
                            <td>{p.data.status}</td>
                        </tr>
                        ))
                        : <tr>
                            <td className="nothing-to-display">No Maintenance Requests to Display</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    }
                    </tbody>
                </table>
                <p className="entry-count">Showing {this.state.requests.length} of {this.state.requests.length} entries</p>
            </div>
        )
    }
}

export default Maintenance