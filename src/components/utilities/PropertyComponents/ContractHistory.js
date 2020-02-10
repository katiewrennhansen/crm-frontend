import React, { Component } from 'react'
import config from '../../../config'
import BrokerContext from '../../../contexts/BrokerContext'
import ApiService from '../../../services/api-service'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

class ContractHistory extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            contracts: [],
        }
    }

    setContracts = (contracts) => {
        this.setState({
            contracts
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/contracthistories`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setContracts(data.histories)
            })
            .catch(error => {
                console.log(error)
            })
    } 

    render() {
        const contracts = this.state.contracts
        return (
            <div>
                <div className='header-grid-component'>
                    <button id="c-btn" className="add" onClick={this.toggleForm}>+</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>View Contract</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(contracts[0])
                        ? contracts.map(f => {
                            return (
                                <tr key={f.data.id}>
                                    <td>{f.data.startdate}</td>
                                    <td>{f.data.enddate}</td>
                                    <td>
                                        {(f.data.contract_url 
                                            ? <a href={`${f.data.contract_url}`} className="close-icon" target="_blank" rel="noopener noreferrer">
                                                <InsertDriveFileIcon />
                                            </a> 
                                            : null)
                                        }
                                    </td>
                                </tr>
                            )
                        })
                        : <tr>
                            <td className='nothing-to-display'>No contracts to display</td>
                            <td></td>
                            <td></td>
                        </tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ContractHistory
