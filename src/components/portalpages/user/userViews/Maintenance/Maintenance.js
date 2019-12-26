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
                this.setRequests(data.maintenances)
            })
            .catch(error => {
                console.log(error)
            })
        const maint = `${config.API_ENDPOINT}/mainttypes`
        ApiService.getDataHalf(maint)
            .then(data => {
                this.setMainttypes(data)
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
                            <th>Type</th>
                            <th>Description</th>
                            <th>Date Requested</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.requests.map(p => (
                        <tr key={p.data.id}>
                            <td>
                                {this.state.assets.map(a => {
                                    if(a.data.id === p.data.asset_id){
                                        return a.data.adescription4  
                                    } else {
                                        return null
                                    }
                                })}
                            </td>
                            <td>
                                {this.state.mainttypes.map(m => {
                                    if(m.id === p.data.mainttype_id){
                                        return m.maindescr  
                                    } else {
                                        return null
                                    }
                                })}
                            </td>
                            <td>{p.data.informto}</td>
                            <td>{p.data.reqdate}</td>
                            <td>{(p.data.deliverdate) ? 'Completed' : 'Pending'}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Maintenance