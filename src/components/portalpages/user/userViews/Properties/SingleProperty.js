import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import BrokerContext from '../../../../../contexts/BrokerContext'
import Features from '../../../broker/brokerViews/Properties/components/Features'
import Messages from '../../../broker/brokerViews/Properties/components/Messages'
import Maintenance from '../../../broker/brokerViews/Properties/components/Maintenance'
import Cost from '../../../broker/brokerViews/Properties/components/Cost'
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

class SingleProperty extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            error: null,
            singleAsset: {}
        }
    }

    setSingleAsset = singleAsset => {
        this.setState({
            singleAsset
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}`
        ApiService.getDataHalf(endpoint)
            .then(data => {

                this.setSingleAsset(data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        const asset = this.state.singleAsset
        const id = this.props.id
        return (
            <div className="single-property-container">
                <div className='header-grid'>
                    <address>
                        <h2>{asset.adescription4}</h2>
                        <h3>{asset.adescription2}, {asset.adescription3}</h3>
                    </address>  
                    <div className="property-icons">               
                        <Link className="close-icon" to='/user/properties'>
                            <CloseIcon 
                                fontSize="large" 
                            />
                        </Link>
                        <Link className="add-icon" to={`/user/properties/${id}/edit`}>
                            <EditIcon 
                                fontSize="large" 
                            />
                        </Link>
                    </div>   
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
                    setCosts={this.setCosts}
                />
            </div>
        )
    }
}

export default SingleProperty