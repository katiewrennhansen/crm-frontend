import React, { Component } from 'react'
import ApiService from '../../../services/api-service'
import config from '../../../config'

class MaintenanceView extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            maintenance: [],
            details: []
        }
    }

    setMaintenance = maintenance => {
        this.setState({
            maintenance
        })
    }

    setDetails = details => {
        this.setState({
            details
        })
    }

    componentDidMount(){
        ApiService.getDataHalf(`${config.API_ENDPOINT}/assets/${this.props.propId}/maintenances/${this.props.maintId}`)
            .then(data => {
                this.setMaintenance(data.data)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/assets/${this.props.propId}/maintenances/${this.props.maintId}/maintenancedetails`)
            .then(data => {
                this.setDetails(data.maintenancedetails)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        const detail = this.state.details
        const maint = this.state.maintenance
        return (
            <div className="contact-container">
                <h1>{maint.maintcomm}</h1>
                

                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Unit Cost</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detail.map(d => {
                            return (
                            <tr>
                                <td>{d.data.type}</td>
                                <td>{d.data.description}</td>
                                <td>{d.data.quantity}</td>
                                <td>{d.data.until}</td>
                                <td>${d.data.unitcost}</td>
                                <td>${d.data.total}</td>
                            </tr>
                            )
                        })}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><strong>Total</strong></td>
                            <td>${maint.initialcost}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MaintenanceView