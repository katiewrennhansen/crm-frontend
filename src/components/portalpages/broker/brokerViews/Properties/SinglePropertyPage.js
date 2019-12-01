import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import BrokerContext from '../../../../../contexts/BrokerContext'
import './Properties.css'

class SinglePageProperty extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            features: [],
            messages: [],
            maintenance: [],
            costs: []
        }
    }

    setFeatures = (feat) => {
        this.setState({
            features: feat
        })
    }

    setMessages = (m) => {
        this.setState({
            messages: m
        })
    }

    setMaintenance = (m) => {
        this.setState({
            maintenance: m
        })
    }

    setCosts = (c) => {
        this.setState({
            costs: c
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.context.setSingleAsset(data.data)
                this.setFeatures(data.data.features)
                this.setMessages(data.data.messages)
                this.setMaintenance(data.data.maintenances)
                this.setCosts(data.data.costs)
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentWillUnmount(){
        this.context.setSingleAsset([])
    }


    render(){
        const asset = this.context.singleAsset
        const features = this.state.features
        const messages = this.state.messages
        const maintenance = this.state.maintenance
        const cost = this.state.costs
        const id = this.props.id
        return (
            <div className="single-property-container">
                <div>
                    <Link to={`/broker/properties/${id}/edit`}>Edit Property</Link>
                </div>
                <div className='broker-properties'>
                    <address>
                        <h2>{asset.adescription4}</h2>
                        <h3>{asset.adescription2}, {asset.adescription3}</h3>
                    </address>
                    <p>{asset.assettype}</p>
                    <p>{asset.assetdesc}</p>
                    <p>{asset.status}</p>
                    <p>${asset.assetprice}</p>
                    <p>Owner: {asset.owner}</p>
                    <p>Current Tenant: {asset.tenant}</p>
                    <p>Broker: {asset.broker}</p>
                    <p>{asset.assetinsurance}</p>
                </div>
                <div>
                    <h2>Features</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map(f => {
                                return (
                                    <tr key={f.id}>
                                        <td>{f.type}</td>
                                        <td>{f.description}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2>Messages</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map(f => {
                                return (
                                    <tr key={f.id}>
                                        <td>{f.type}</td>
                                        <td>{f.description}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2>Maintenance</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Cost</th>
                                <th>Provider</th>
                                <th>Plan Date</th>
                                <th>Request Date</th>
                                <th>Deliver Date</th>
                                <th>Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maintenance.map(f => {
                                return (
                                    <tr key={f.id}>
                                        <td>{f.description}</td>
                                        <td>${f.initialcost}</td>
                                        <td>{f.provider}</td>
                                        <td>{f.plandate}</td>
                                        <td>{f.requestdate}</td>
                                        <td>{(f.deliverdate) ? (f.deliverdate) : '-' }</td>
                                        <td>{f.maintcomm}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2>Costs</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cost.map(f => {
                                return (
                                    <tr key={f.id}>
                                        <td>{f.concept}</td>
                                        <td>{f.amount}</td>
                                        <td>{f.year}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default SinglePageProperty