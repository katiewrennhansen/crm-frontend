import React, { useState, useEffect } from 'react'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'

export default function Maintenance() {
    const endpoint = `${config.API_ENDPOINT}/assets`
    const [requests, setRequests] = useState([])
    const [assets, setAssets] = useState([])

    useEffect(() => {
        const abortController = new AbortController();
        ApiService.getDataFromEffect(`${endpoint}/0/maintenances`, abortController)
            .then(data => setRequests(data.maintenances))
            .catch(err =>  {
                if (!abortController.signal.aborted) {
                    console.log(err)
                }
            })

        return function cleanup(){
            abortController.abort();
        }
    }, [endpoint]);

    useEffect(() => {
        const abortController = new AbortController();
        ApiService.getDataFromEffect(`${endpoint}`, abortController)
            .then(data => setAssets(data.assets))
            .catch(err =>  {
                if (!abortController.signal.aborted) {
                    console.log(err)
                }
            })

        return function cleanup(){
            abortController.abort();
        }
    }, [endpoint]);
       
    return (
        <div className='data-container'>
            <h2>Maintenance Requests</h2>
            <table className='data-table'>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Provider</th>
                        <th>Description</th>
                        <th>Cost</th>
                        <th>Date Requested</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {(requests[0])
                    ? requests.map(p => (
                        <tr key={p.data.id}>
                            <td>{assets.map(a => (a.data.id === p.data.asset_id) ? a.data.adescription4 : null)}</td>
                            <td>{p.data.provider}</td>
                            <td>{p.data.maintcomm}</td>
                            <td>${p.data.initialcost}</td>
                            <td>{p.data.reqdate}</td>
                            <td>{(p.data.deliverdate) ? 'Completed' : 'Pending'}</td>
                        </tr>
                    ))
                    : <tr>
                        <td className="nothing-to-display">No Maintenance Requests to Display</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                }
                </tbody>
            </table>
            <p className="entry-count">Showing {requests.length} of {requests.length} entries</p>
        </div>
    )
}
