import React, { Component } from 'react'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'

class Visits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            requests: [],
            assets: []
        };
    }

    setRequests = requests => {
        this.setState({
            requests
        })
    }

    setAssets = assets => {
        this.setState({
            assets
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets/0/assetcomments`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                if(data.assetcomments){
                    this.setRequests(data.assetcomments)
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
                <h2>Visit Requests</h2>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Comment</th>
                            <th>Date Requested</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.requests[0])
                        ? this.state.requests.map(p => {
                            if(p.data.alarm){
                                return (
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
                                        <td>{p.data.assetcomment}</td>
                                        <td>{p.data.requestdate}</td>
                                        <td>{(p.data.confirmatindate) ? `Completed ${p.data.requestdate}` : 'Pending'}</td>
                                    </tr>
                                )
                            } else {
                                return null
                            }
                        })
                        : 
                        <tr>
                            <td className="nothing-to-display">No Visit Requests to Display</td>
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

export default Visits