import React, { Component } from 'react'
import config from '../../../config'
import BrokerContext from '../../../contexts/BrokerContext'
import ApiService from '../../../services/api-service'

class Maintenance extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            maintenance: [],
            mainttypes: [],
            providers: []
        }
    }

    setMaintenance = (maintenance) => {

        this.setState({
            maintenance
        })
    }

    setMaintTypes = (mainttypes) => {
        this.setState({
            mainttypes
        })
    }

    setProviders = (providers) => {
        this.setState({
            providers
        })
    }



    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/maintenances`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setMaintenance(data.maintenances)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/mainttypes`)
            .then(data => {
                this.setMaintTypes(data)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/providers`)
            .then(data => {
                this.setProviders(data.providers)
            })
            .catch(error => {
                console.log(error)
            })
    }

    addMaintenance = (e) => {
        e.preventDefault()
        const newMaintenance= {
            maintenance: {
                informto: e.target.description.value,
                initialcost: e.target.initial_cost.value,
                finalcost: e.target.final_cost.value,
                maintcomm: e.target.comment.value,
                plandate: e.target.plan_date.value,
                deliverdate: e.target.deliver_date.value,
                provider_id: e.target.provider.value,
                mainttype_id: e.target.maint_type.value
            }
        }

        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/maintenances`
        
        ApiService.postDataHalf(endpoint, newMaintenance)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setMaintenance(data)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteMaintenance = (id) => {
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/maintenances`

        ApiService.deleteDataHalf(endpoint, id)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setMaintenance(data.maintenances)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    toggleForm = () => {
        const form = document.getElementById('maintenance-form')
        form.classList.toggle('hidden')
        const btn = document.getElementById('m-btn')
        if(form.className === 'sp-form hidden'){
            btn.innerHTML = '+'
        } else {
            btn.innerHTML = '-'
        }
    }


    render() {
        return (
            <div>
                <div className='header-grid'>
                    <h3>Maintenance</h3>
                    <button className='add' id="m-btn" onClick={this.toggleForm}>+</button>
                </div>
                <form className="sp-form hidden" id="maintenance-form" onSubmit={(e) => {this.addMaintenance(e)}}>
                    <div className="form-group">
                        <label htmlFor="maint_type">Maintenance Type: </label>
                        <select name="maint_type">
                            <option value="">Select a Type</option>
                            {this.state.mainttypes.map(m => {
                                return (
                                <option key={m.id} value={m.id}>{m.maindescr}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="provider">Maintenance Provider: </label>
                        <select name="provider">
                            <option value="">Select a Type</option>
                            {this.state.providers.map(m => {
                                return (
                                <option key={m.data.id} value={m.data.id}>{m.data.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <input type="text" name="description"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Comment: </label>
                        <input type="text" name="comment"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="initial_cost">Initial Cost: </label>
                        <input type="number" name="initial_cost"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="final_cost">Final Cost: </label>
                        <input type="number" name="final_cost"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="plan_date">Plan Date: </label>
                        <input type="date" name="plan_date"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="deliver_date">Deliver Date: </label>
                        <input type="date" name="deliver_date"></input>
                    </div>
                    <input type="submit" className="submit" value="Add Maintenance"></input>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Cost</th>
                            <th>Provider</th>
                            <th>Request Date</th>
                            <th>Deliver Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.maintenance.map(f => {
                            return (
                                <tr key={f.data.id}>
                                    <td>{f.data.informto}</td>
                                    <td>${f.data.initialcost}</td>
                                    <td>
                                        {(this.state.providers).map(p => {
                                            if(p.data.id === f.data.provider_id){
                                                return p.data.name
                                            }
                                            else {
                                                return null
                                            }
                                        })}
                                    </td>
                                    <td>{f.data.reqdate}</td>
                                    <td>{(f.data.deliverdate) ? `Completed ${f.data.deliverdate}` : 'Pending' }</td>
                                    <td className="delete">
                                        <button className="delete-btn" onClick={() => this.deleteMaintenance(f.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Maintenance