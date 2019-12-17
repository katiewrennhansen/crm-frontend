import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import UserContext from '../../../../../contexts/UserContext'
import AddIcon from '@material-ui/icons/Add';
import property1 from '../../../../../images/property1.jpg'

class Properties extends Component {
    static contextType = UserContext

    constructor(props){
        super(props)
        this.state = {
            assets: []
        }
    }
    
    setAssets = assets => {
        this.setState({
            assets
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setAssets(data.assets)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return (
            <div className='broker-properties'>
                <div className='header-grid'>
                    <h2>My Listings</h2>
                    <Link className="add-icon" to='/user/properties/add'>
                        <AddIcon 
                            fontSize="large" 
                            aria-label="add property" 
                        />
                    </Link>
                </div>
                <div className='broker-properties-grid'>
                    {this.state.assets.map(a => {
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
                                    to={`/user/properties/${a.data.id}`}
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