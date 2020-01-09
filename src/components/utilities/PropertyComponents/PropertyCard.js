import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import property1 from '../../../images/property1.jpg'

class PropertyCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null
        }
    }

    render(){
        const a = this.props.property
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
                    to={`/${this.props.type}/properties/${a.data.id}`}
                    className="manage-listing"
                >
                    Manage Listing
                </Link>
            </div>
        )
    }
}

export default PropertyCard