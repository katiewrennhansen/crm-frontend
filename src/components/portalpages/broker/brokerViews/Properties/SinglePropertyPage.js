import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import BrokerContext from '../../../../../contexts/BrokerContext'
import Features from './components/Features'
import Messages from './components/Messages'
import Maintenance from './components/Maintenance'
import Cost from './components/Cost'
import './Properties.css'

class SinglePageProperty extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            error: null
        }
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
    }


    componentWillUnmount(){
        this.context.setSingleAsset([])
    }


    render(){
        const asset = this.context.singleAsset
        const id = this.props.id
        return (
            <div className="single-property-container">
                <div className='header-grid'>
                    <address>
                        <h2>{asset.adescription4}</h2>
                        <h3>{asset.adescription2}, {asset.adescription3}</h3>
                    </address>                    
                    <Link className="edit" to={`/broker/properties/${id}/edit`}>Edit Property</Link>
                </div>
                <div className='broker-properties'>
                    
                    <p>{asset.assettype}</p>
                    <p>{asset.assetdesc}</p>
                    <p>{asset.status}</p>
                    <p>${asset.assetprice}</p>
                    <p>Owner: {asset.owner}</p>
                    <p>Current Tenant: {asset.tenant}</p>
                    <p>Broker: {asset.broker}</p>
                    <p>{asset.assetinsurance}</p>
                </div>
                <Features 
                    id={this.props.id}
                />
                <Messages 
                    id={this.props.id}
                />
                <Maintenance
                    id={this.props.id}
                />
               <Cost
                    id={this.props.id}
                />
            </div>
        )
    }
}

export default SinglePageProperty