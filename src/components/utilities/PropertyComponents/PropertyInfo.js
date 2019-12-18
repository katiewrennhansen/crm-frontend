import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../config'
import ApiService from '../../../services/api-service'
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

class PropertyInfo extends Component {
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

    componentWillUnmount(){
        this.setState({
            singleAsset: []
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
        const type = this.props.type
        return (
            <div className='header-grid'>
                <address>
                    <h2>{asset.adescription4}</h2>
                    <h3>{asset.adescription2}, {asset.adescription3}</h3>
                </address>  
                <div className="property-icons">               
                    <Link className="close-icon" to={`/${type}/properties`}>
                        <CloseIcon 
                            fontSize="large" 
                        />
                    </Link>
                    <Link className="add-icon" to={`/${type}/properties/${this.props.id}/edit`}>
                        <EditIcon 
                            fontSize="large" 
                        />
                    </Link>
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
            </div>
        )
    }
}

export default PropertyInfo