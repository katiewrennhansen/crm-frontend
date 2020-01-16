import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import BrokerContext from '../../../../../contexts/BrokerContext'
import AddIcon from '@material-ui/icons/Add';
import PropertyCard from '../../../../utilities/PropertyComponents/PropertyCard'
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
                            aria-label="add property" 
                        />
                    </Link>
                </div>
                <div className='broker-properties-grid'>
                    {(this.context.assets[0])
                    ? this.context.assets.map(a => {
                        return (
                            <div key={a.id}>
                                <PropertyCard 
                                    property={a}
                                    type="broker"
                                />
                            </div>
                        )
                    })
                    : <p className="nothing-to-display">Click the + icon to add a new listing</p>
                    }
                </div>
            </div>
        )
    }
}

export default Properties