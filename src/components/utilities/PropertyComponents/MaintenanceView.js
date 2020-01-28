import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../services/api-service'
import config from '../../../config'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

class MaintenanceView extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            maintenance: [],
            mainttypes: [],
            details: [],
            quantity: 0,
            unitCost: 0
        }
    }

    setMainttypes = mainttypes => {
        this.setState({
            mainttypes
        })
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

    setQuantity = e => {
        this.setState({
            quantity: e.target.value
        })
    }

    setUnitCost = e => {
        this.setState({
            unitCost: e.target.value
        })
    }

    componentDidMount(){
        ApiService.getDataHalf(`${config.API_ENDPOINT}/mainttypes`)
            .then(data => {
                this.setMainttypes(data)
            })
            .catch(error => {
                console.log(error)
            })
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

    addCharge = e => {
        e.preventDefault()
        const newCharge = {
            maintenancedetail: {
                mainttype_id: e.target.type.value,
                description: e.target.description.value,
                unit: e.target.unit.value,
                quantity: e.target.quantity.value,
                unitcost: e.target.unitcost.value,
            }
        }
        console.log(newCharge)
    }

    render(){
        const detail = this.state.details
        const maint = this.state.maintenance
        return (
            <div className="contact-container">
                <Link to={`/user/properties/${this.props.propId}/maintenance/`}>Back</Link>
                <h1>{maint.maintcomm}</h1>
                <p>Requested: {maint.reqdate}</p>
                <p>Plan Data: {maint.plandate}</p>
                <p>Completed: {maint.deliverdate}</p>
                <p>Provider: {maint.provider}</p>
                <p>Status: {maint.status}</p>
                {/* {(maint.reciepts_url[0])
                ? <a href={maint.reciepts_url[0]}>
                    <InsertDriveFileIcon />
                </a>
                : null
                } */}
                
                <form onSubmit={(e) => this.addCharge(e)}>
                    <div className="inner-form-content">
                        <h3>Add Charge</h3>
                        <div className="form-group row">
                            <div>
                                <label htmlFor="type">Type</label> 
                                <select name="type">
                                    <option>Select a Maintenance Type</option>
                                    {this.state.mainttypes.map(t => {
                                        return (
                                            <option key={t.id} value={t.id}>{t.maindescr}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="description">Description</label> 
                                <input type="text" name="description"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div>
                                <label htmlFor="quantity">Quantity</label> 
                                <input type="number" name="quantity" onChange={(e) => this.setQuantity(e)}/>
                            </div>
                            <div>
                                <label htmlFor="unit">Unit</label> 
                                <input type="text" name="unit"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div>
                                <label htmlFor="unitcost">Unit Cost</label> 
                                <input type="number" name="unitcost" onChange={(e) => this.setUnitCost(e)}/>
                            </div>
                            <div>
                                <label htmlFor="total">Total Cost</label> 
                                <input type="number" name="total" value={this.state.quantity * this.state.unitCost} readOnly={true}/>
                            </div>
                        </div>
                        <input type="submit" className="submit" value="Add Charge"/>
                   </div>
                </form>
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
                            <tr key={d.data.id}>
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