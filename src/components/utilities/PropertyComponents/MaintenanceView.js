import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../services/api-service'
import config from '../../../config'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CircularProgress from '@material-ui/core/CircularProgress';

class MaintenanceView extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            maintenance: [],
            mainttypes: [],
            details: [],
            quantity: 0,
            unitCost: 0,
            total: '',
            loading: false
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

    setTotal = total => {
        this.setState({
            total
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
                this.setTotal(data.data.initialcost)
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
        this.setState({loading: true})
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.propId}/maintenances/${this.props.maintId}`
        
        const newCharge = {
            maintenancedetail: {
                mainttype_id: e.target.type.value,
                description: e.target.description.value,
                unit: e.target.unit.value,
                quantity: e.target.quantity.value,
                unitcost: e.target.unitcost.value,
            }
        }

        ApiService.postDataHalf(`${endpoint}/maintenancedetails`, newCharge)
            .then(data => {
                ApiService.getDataHalf(`${endpoint}/maintenancedetails`)
                    .then(data => this.setDetails(data.maintenancedetails))
                    .catch(error => console.log(error))

                ApiService.getDataHalf(endpoint)
                    .then(data => this.setTotal(data.data.initialcost))
                    .catch(error => console.log(error))
            })
            .then(() => this.setState({loading: false}))
            .catch(error => {
                this.setState({loading: false})
                console.log(error)
            })

        e.target.type.value = ""
        e.target.description.value = ""
        e.target.unit.value = ""
        e.target.quantity.value = ""
        e.target.unitcost.value = ""
    }

    render(){
        const detail = this.state.details
        const maint = this.state.maintenance
        const receipt = maint.receipts_url
        return (
            <div className="contact-container">
                <Link to={`/user/properties/${this.props.propId}/maintenance`}>Back</Link>
                <div className="header-grid">
                    <h1>{maint.maintcomm}</h1>
                    {(receipt)
                        ? <a href={Object.values(receipt)[0].receipts} target="_blank" rel="noopener noreferrer" className="active-icon">
                            View Receipt
                            <InsertDriveFileIcon />
                        </a>
                        : null
                    }
                </div>
                <p>Requested: {maint.reqdate}</p>
                <p>Plan Data: {maint.plandate}</p>
                <p>Completed: {maint.deliverdate}</p>
                <p>Provider: {maint.provider}</p>
                <p>Status: {maint.status}</p>
                
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
                            <td>${this.state.total}</td>
                        </tr>
                    </tbody>
                </table>
                <form onSubmit={(e) => this.addCharge(e)}>
                    <div className="inner-maint-form-content">
                        <h3>Add Charge</h3>
                        <div className="form-group col-6">
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
                            <div>
                                <label htmlFor="quantity">Quantity</label> 
                                <input type="number" name="quantity" onChange={(e) => this.setQuantity(e)}/>
                            </div>
                            <div>
                                <label htmlFor="unit">Unit</label> 
                                <input type="text" name="unit"/>
                            </div>
                            <div>
                                <label htmlFor="unitcost">Unit Cost</label> 
                                <input type="number" name="unitcost" onChange={(e) => this.setUnitCost(e)}/>
                            </div>
                            <div>
                                <label htmlFor="total">Total Cost</label> 
                                <input type="number" name="total" value={this.state.quantity * this.state.unitCost} readOnly={true}/>
                            </div>
                        </div>
                        {(this.state.loading) ? <CircularProgress /> : <input type="submit" className="submit" value="Add Charge"/>}
                   </div>
                </form>
            </div>
        )
    }
}

export default MaintenanceView