import React, { Component } from 'react'
import BrokerContext from '../../../../../contexts/BrokerContext'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'

class Network extends Component {
    static contextType = BrokerContext

    constructor(props){
        super(props)
        this.state = {
            network: [],
            error: null
        }
    }

    setNetwork = network => {
        this.setState({
            network
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/customers/0/networks`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setNetwork(data.networks)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return (  
            <div className='data-container'>
                <h2>Network</h2>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Relationship</th>
                            <th>Reference</th>
                            <th>Special Event</th>
                            <th>Event Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.network[0])
                            ? this.state.network.map(p => (
                            <tr key={p.data.id}>
                                <td>{p.data.customer}</td>
                                <td>{p.data.contact}</td>
                                <td>{p.data.type}</td>
                                <td>{p.data.reference}</td>
                                <td>{p.data.specialevent}</td>
                                <td>{p.data.eventdate}</td>
                            </tr>
                            ))
                            : <tr>
                                <td className="nothing-to-display">No Network to Display</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        }
                    </tbody>
                </table>
                <p className="entry-count">Showing {this.state.network.length} of {this.state.network.length} entries</p>
                <p>{(this.state.error) ? this.state.error : null}</p>
            </div>
        )
    }

}

export default Network