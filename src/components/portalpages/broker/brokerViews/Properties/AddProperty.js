import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import BrokerContext from '../../../../../contexts/BrokerContext'
import CloseIcon from '@material-ui/icons/Close';
import './Properties.css'
import PropertyForm from '../../../../utilities/Forms/PropertyForm'

class AddProperty extends Component {
    static contextType = BrokerContext

    constructor(props) {
        super(props)
        this.state = {
            error: null
        }
    }

    updateFiles = (file) => {
        this.setState({
            file: [...file]
        })
    }

    fileSelectedHandler = (e) => {
        this.updateFiles(e.target.files)
    }

    submitProperty = (e) => {
        e.preventDefault()
        const newProperty = {
            adescription4: e.target.street_name.value,
            adescription5: e.target.city.value,
            adescription2: e.target.state.value,
            adescription3: e.target.zip_code.value,
            adescription1: e.target.country.value,
            assetdesc: e.target.description.value,
            assetprice: e.target.price.value,
            futureprice: e.target.future_price.value,
            assettype_id: e.target.asset_type.value,
            customer_id: e.target.owner.value,
            tcustomer_id: e.target.tenant.value,
            broker_id: e.target.brokers.value,
            processt_id: e.target.process.value,
            step_id: e.target.steps.value,
            stepdate: e.target.step_date.value,
            status_id: e.target.status.value,
            assetinsurance: e.target.insurance.value,
            insurancedued : e.target.insurance_due.value
        }
        const endpoint = `${config.API_ENDPOINT}/assets`

        ApiService.postDataHalf(endpoint, newProperty)
            .then(() => {
                this.props.history.push('/broker/properties')
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return (
            <div className='add-property'>
                <div className='header-grid'>
                    <h2>Add New Property</h2>
                    <Link className="close-icon" to='/broker/properties'>
                        <CloseIcon 
                            className="action-icon" 
                            fontSize="medium" 
                        />
                    </Link>
                </div>
                <div>
                    <PropertyForm 
                        handleSubmit={this.submitProperty}
                        asset={[]}
                        button="Add Property"
                    />
                </div>
            </div>
        )
    }
}

export default AddProperty