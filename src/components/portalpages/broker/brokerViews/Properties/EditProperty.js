import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import BrokerContext from '../../../../../contexts/BrokerContext'
import './Properties.css'

class EditProperty extends Component {
    static contextType = BrokerContext

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.context.setSingleAsset(data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        const asset = this.context.singleAsset
        const id = this.props.id
        return (
            <div className='edit-property'>
                <div>
                    <Link to={`/broker/properties/${id}`}>Cancel</Link>
                </div>
                <h2>Edit {asset.adescription4}</h2>
              
            </div>
        )
    }
}

export default EditProperty