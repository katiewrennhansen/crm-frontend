import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PropertyCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null
        }
    }

    render(){
        const a = this.props.property
        const url = a.data.images_url
        return (
            <div 
                key={a.data.id} 
                className='asset-card'
            >
                <div className="image-container">
                    <img className="property-photo" src={(url) ? url[0].image : null} alt="property"/>
                    <p className="price">{a.data.assetprice}</p>
                </div>

                <div className="top-content">
                    <h4>{a.data.processt}</h4>
                    <address>
                        {a.data.adescription1}
                        <br></br>
                        {a.data.adescription2}, {a.data.adescription3}
                    </address>
                    <div className="bottom-grid">
                        <p>Status: {a.data.status}</p>
                        <Link 
                            to={`/${this.props.type}/properties/${a.data.id}`}
                            className="manage-listing"
                        >
                            Manage Listing
                        </Link>
                    </div>
                </div>

            </div>
        )
    }
}

export default PropertyCard