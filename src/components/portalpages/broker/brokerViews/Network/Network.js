import React, { Component } from 'react'
import BrokerContext from '../../../../../contexts/BrokerContext'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'

class Network extends Component {
    static contextType = BrokerContext

    constructor(props){
        super(props)
        this.state = {
            network: []
        }
    }

    setNetwork = network => {
        this.setState({
            network
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/customers/1/networks`
        ApiService.getDataHalf(endpoint)
            .then(data => {

            })
    }

    render(){
        return (  
            <div className='data-container'>
            <h3>Promotions</h3>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total Cost</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(p => (
                        <tr key={p.data.id}>
                            <td>{p.data.typepromotion}</td>
                            <td>{p.data.startdate}</td>
                            <td>{p.data.duedate}</td>
                            <td>{p.data.totalcost}</td>
                            <td>
                                <button className='update-btn' onClick={() => this.setAssign(true, p.data.id, p.data.typepromotion)}>Assign to User</button>
                            </td>
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