import React, { Component } from 'react'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

class Contracts extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            contracts: [],
            assets: []
        }
    }

    setContracts = contracts => {
        this.setState({
            contracts
        })
    }

    setAssets = assets => {
        this.setState({
            assets
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets/0/contracthistories`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setContracts(data.histories)
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
                <h2>Contracts</h2>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        (this.state.contracts[0]) 
                        ?
                            this.state.contracts.map(c => {
                                return (
                                    <tr key={c.data.id}>
                                        <td>
                                            {this.state.assets.map(a => {
                                                if(a.data.id === c.data.asset_id){
                                                    return a.data.adescription4  
                                                } else {
                                                    return null
                                                }
                                            })}
                                        </td>
                                        <td>{c.data.startdate}</td>
                                        <td>{c.data.enddate}</td>
                                        <td className="action-icon">
                                            <a href={`${c.data.contract_url}`} className="close-icon" target="_blank" rel="noopener noreferrer">
                                                <InsertDriveFileIcon />
                                            </a> 
                                        </td>                                       
                                    </tr>
                                )})
                            : ( <tr>
                                    <td className="nothing-to-display">No Contracts to Display</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr> )
                        }
                    </tbody>
                </table>
                <p className="entry-count">Showing {this.state.contracts.length} of {this.state.contracts.length} entries</p>
            </div>
        )
    }
}

export default Contracts