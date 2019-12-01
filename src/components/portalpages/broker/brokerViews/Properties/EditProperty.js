import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import BrokerContext from '../../../../../contexts/BrokerContext'
import './Properties.css'

class EditProperty extends Component {
    static contextType = BrokerContext

    constructor(props) {
        super(props)
        this.state = {
            brokers: [],
            process: [],
            steps: [],
            categories: [],
            status: [],
            assets: [],
            customers: []
        }
    }

    setBrokers = (brokers) => {
        this.setState({
            brokers
        })
    }

    setProcess = (process) => {
        this.setState({
            process
        })
    }

    setSteps = (steps) => {
        this.setState({
            steps
        })
    }

    setCategories = (categories) => {
        this.setState({
            categories
        })
    }

    setStatus = (status) => {
        this.setState({
            status
        })
    }

    setAssetType = (assets) => {
        this.setState({
            assets
        })
    }

    setCustomers = (customers) => {
        this.setState({
            customers
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.context.setSingleAsset(data.data)
            })
            .catch(error => {
                console.log(error)
            })
            ApiService.getDataHalf(`${config.API_ENDPOINT}/brokers`)
            .then(data => {
                this.setBrokers(data.brokers)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/processts`)
            .then(data => {
                this.setProcess(data.processts)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/categories`)
            .then(data => {
                this.setCategories(data)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/statuses`)
            .then(data => {
                this.setStatus(data)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/assettypes`)
            .then(data => {
                this.setAssetType(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        const asset = this.context.singleAsset
        const id = this.props.id
        return (
            <div className='edit-property'>
                <div className='header-grid'>
                    <h2>Edit {asset.adescription4}</h2>
                    <Link className="btn" to={`/broker/properties/${id}`}>Cancel</Link>
                </div>
                <form className="edit-property-form"onSubmit={(e) => {this.submitProperty(e)}}>
                        <h3>Address</h3>
                        <div className="form-group">
                            <label htmlFor="street_name">Street Name: </label>
                            <input type="text" name="street_name" defaultValue={asset.adescription4}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City: </label>
                            <input type="text" name="city" defaultValue={asset.adescription5}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State: </label>
                            <input type="text" name="state" defaultValue={asset.adescription2}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="zip_code">Zip Code: </label>
                            <input type="text" name="zip_code" defaultValue={asset.adescription3}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country: </label>
                            <input type="text" name="country"defaultValue={asset.adescription1}></input>
                        </div>

                        <h3>Asset Information</h3>
                        <div className="form-group">
                            <label htmlFor="description">Description: </label>
                            <textarea name="description" defaultValue={asset.assetdesc}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Rent/Sell: </label>
                            <div className="price-type">
                                <label htmlFor="rent">
                                    <input type="radio" name="rent"></input>
                                    Rent
                                </label>    
                                <label htmlFor="sell">
                                    <input type="radio" name="sell"></input>
                                    Sell
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price: </label>
                            <input type="number" name="price" defaultValue={asset.assetprice}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="future_price">Future Price: </label>
                            <input type="number" name="future_price" defaultValue={asset.futureprice}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="asset_type">Asset Type: </label>
                            <select name="asset_type">
                                <option value="">Select an Asset Type</option>
                                {this.state.assets.map(a => {
                                    return (
                                    <option key={a.id} value={a.id}>{a.assettdesc}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="owner">Owner: </label>
                            <select name="owner">
                                <option value="">Select an Owner</option>
                                {this.state.customers.map(c => {
                                    return (
                                    <option key={c.data.id} value={c.data.id}>{c.data.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tenant">Tenant: </label>
                            <select name="tenant">
                                <option value="">Select a Tenant</option>
                                {this.state.customers.map(c => {
                                    return (
                                    <option key={c.data.id} value={c.data.id}>{c.data.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="brokers">Broker: </label>
                            <select name="brokers">
                                <option value="">Select a Broker</option>
                                {this.state.brokers.map(b => {
                                    return (
                                    <option key={b.data.id} value={b.data.id}>{b.data.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="process">Process: </label>
                            <select name="process" onChange={(e) => {this.getSteps(e)}}>
                                <option value="">Select a Process</option>
                                {this.state.process.map(p => {
                                    return (
                                    <option key={p.data.id} value={p.data.id}>{p.data.processdesc}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="steps">Steps: </label>
                            <select name="steps">
                                <option value="">Select a Step</option>
                                {this.state.steps.map(s => {
                                    return (
                                    <option key={s.id} value={s.id}>{s.stepdesc}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="step_date">Step Date: </label>
                            <input type="date" name="step_date" defaultValue={asset.stepdate}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="categories">Category: </label>
                            <select name="categories">
                                <option value="">Select a Category</option>
                                {this.state.categories.map(c => {
                                    return (
                                    <option key={c.id} value={c.id}>{c.ccategdesc}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status: </label>
                            <select name="status">
                                <option value="">Select a Status</option>
                                {this.state.status.map(s => {
                                    return (
                                    <option key={s.id} value={s.id}>{s.statusdesc}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <h3>Insurance Information</h3>
                        <div className="form-group">
                            <label htmlFor="insurance">Insurance Provider: </label>
                            <input type="text" name="insurance" defaultValue={asset.assetinsurance}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="insurance_due">Insurance Due: </label>
                            <input type="date" name="insurance_due"defaultValue={asset.insurancedued}></input>
                        </div>
                        
                        

                        <input type="submit" className="submit" value="Edit Property"></input>
                    </form>
              
            </div>
        )
    }
}

export default EditProperty