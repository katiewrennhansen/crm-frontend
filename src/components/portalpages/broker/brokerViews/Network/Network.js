import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
        const endpoint = `${config.API_ENDPOINT}/customers/10/networks`
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
            <div className='container'>
                <div className='header-grid'>
                    <h3>Network</h3>
                    <Link to='broker/network/add' className='add'>Add Network</Link>
                </div>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Reference</th>
                            <th>Special Event</th>
                            <th>Event Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.network.map(p => (
                        <tr key={p.data.id}>
                            <td>{p.data.customer}</td>
                            <td>{p.data.contact}</td>
                            <td>{p.data.reference}</td>
                            <td>{p.data.specialevent}</td>
                            <td>{p.data.eventdate}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <p>{(this.state.error) ? this.state.error : null}</p>
            </div>
        )
    }

}

export default Network