import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../config'
import ApiService from '../../../services/api-service'
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import property1 from '../../../images/property1.jpg'

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
                    <h3>{asset.adescription5} {asset.adescription2}, {asset.adescription3}</h3>
                </address>  
                <div className="property-icons">               
                    <Link className="close-icon" to={`/${type}/properties`}>
                        <CloseIcon 
                            className="action-icon" 
                        />
                    </Link>
                    <Link className="add-icon" to={`/${type}/property/${this.props.id}/edit`}>
                        <EditIcon 
                            className="action-icon" 
                        />
                    </Link>
                </div>  
                <div className='broker-properties'>
                    <img className="property-image" src={property1} alt="property"/>
                    <div>
                        <h3>Property Information</h3>
                        <div className="property-info">
                            <p>Type:</p>
                            <p>{asset.assettype}</p>
                        </div>
                        <div className="property-info">
                            <p>Description:</p> 
                            <p>{asset.assetdesc}</p>
                        </div>
                        <div className="property-info">
                            <p>Status:</p> 
                            <p>{asset.status}</p>
                        </div>
                        <div className="property-info">
                            <p>List Price:</p>
                            <p>${asset.assetprice}</p>
                        </div>
                        <div className="property-info">
                        <p>Owner:</p> 
                        <p>{asset.owner}</p>
                        </div>
                        <div className="property-info">
                            <p>Current Tenant:</p>
                            <p>{asset.tenant}</p>
                        </div>
                        <div className="property-info">
                            <p>Broker:</p>
                            <p>{asset.broker}</p>
                        </div>
                        <div className="property-info">
                            <p>Process:</p>
                            <p>{asset.processt}</p>
                        </div>
                        <div className="property-info">
                            <p>Insurance:</p>
                            <p>{asset.assetinsurance}</p>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default PropertyInfo