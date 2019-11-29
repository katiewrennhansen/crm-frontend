import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import BrokerContext from '../../../../../contexts/BrokerContext'
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
                <h2>Properties</h2>
                <div className='broker-properties-grid'>
                    {this.context.assets.map(a => {
                        return (
                            <div 
                                key={a.data.id} 
                                className='asset-card'
                            >
                                <div>
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