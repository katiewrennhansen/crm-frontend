import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import BrokerContext from '../../../../../contexts/BrokerContext'
import AddIcon from '@material-ui/icons/Add';
import property1 from '../../../../../images/property1.jpg'
import './Properties.css'

class Properties extends Component {
    static contextType = BrokerContext

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.context.setAssets(data.assets)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return (
            <div className='broker-properties'>
                <div className='header-grid'>
                    <h2>My Properties</h2>
                    <Link className="add-icon" to='/broker/properties/add'>
                        <AddIcon 
                            className="action-icon" 
                            fontSize="medium" 
                            aria-label="add property" 
                        />
                    </Link>
                </div>
                <div className='broker-properties-grid'>
                    {this.context.assets.map(a => {
                        return (
                            <div 
                                key={a.data.id} 
                                className='asset-card'
                            >
                                <div className="top-content">
                                    <div className="image-container">
                                        <img className="property-photo" src={property1} alt="property"/>
                                        <p className="price">${a.data.assetprice}</p>
                                    </div>
                                    <h4>{a.data.processt}</h4>
                                    <address>
                                        {a.data.adescription4}
                                        <br></br>
                                        {a.data.adescription2}, {a.data.adescription3}
                                    </address>
                                </div>
                                <p>{a.data.status}</p>
                                <Link 
                                    to={`properties/${a.data.id}`}
                                    className="manage-listing"
                                >
                                    Manage Listing
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Properties