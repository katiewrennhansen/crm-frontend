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
            singleAsset: {},
            imgToDisplay: ''
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
                this.setImgToDisplay(data.data.images_url[0].image)
            })
            .catch(error => {
                console.log(error)
            })
    }

    setImgToDisplay = url => {
        this.setState({
            imgToDisplay: url
        })
    }

    render(){
        const asset = this.state.singleAsset
        const url = this.state.singleAsset.images_url
        const type = this.props.type
        return (
            <div className='header-grid'>
                <address>
                    <h2>{asset.adescription1}</h2>
                    <h3>{asset.adescription2} {asset.adescription3}, {asset.adescription4}</h3>
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
                        {/* <p>Edit Listing</p> */}
                    </Link>
                </div>  
                <div className='broker-properties'>
                    <img className="property-image" src={this.state.imgToDisplay} alt="property"/>
                    <div className="property-thumbnail-image-container">
                        {(url) ? asset.images_url.map((img, i) => {
                            return (
                                <img 
                                    key={i}
                                    className="property-thumbnail-image" 
                                    src={img.image} 
                                    alt="property"
                                    onClick={() => this.setImgToDisplay(img.image)}
                                />
                            )
                        }) : null}
                    </div>
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
                        {(asset.assetprice)
                            ? <div className="property-info">
                                <p>Asset Price:</p>
                                <p>{asset.assetprice}</p>
                            </div>
                        : null
                        }
                        {(asset.futureprice)
                            ? <div className="property-info">
                                <p>Future Price:</p>
                                <p>{asset.futureprice}</p>
                            </div>
                        : null
                        }
                        <div className="property-info">
                            <p>Asset Rent:</p>
                            <p>{asset.assetrent}</p>
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
                            <p>Endorser:</p>
                            <p>{asset.endorser}</p>
                        </div>
                        <div className="property-info">
                            <p>Warranty:</p>
                            <p>{asset.warranty}</p>
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
                            <p>Process Step:</p>
                            <p>{asset.step}</p>
                        </div>
                        <div className="property-info">
                            <p>Insurance:</p>
                            <p>{asset.assetinsurance}</p>
                        </div>
                        <div className="property-info">
                            <p>Insurance End Date:</p>
                            <p>{asset.insurancedued}</p>
                        </div>
                        <div className="property-info">
                            <p>Contract Start Date:</p>
                            <p>{asset.assetstart}</p>
                        </div>
                        <div className="property-info">
                            <p>Contract End Date:</p>
                            <p>{asset.assetdue}</p>
                        </div>
                    </div>
                </div>
                <div className="contract-link">
                    {(asset.contract_url)
                    ? <a className=" submit" href={asset.contract_url} target="_blank" rel="noopener noreferrer">View Contract</a>
                    : null
                    }
                    <Link className="submit" to={`/${type}/property/${this.props.id}/documents`}>Property Documents</Link> 
                </div>
            </div>
        )
    }
}

export default PropertyInfo