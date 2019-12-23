import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import BrokerContext from '../../../../../contexts/BrokerContext'
import PropertyForm from '../../../../utilities/Forms/PropertyForm'
import CloseIcon from '@material-ui/icons/Close';

class AddProperty extends Component {
    static contextType = BrokerContext

    constructor(props) {
        super(props)
        this.state = {
            error: null
        }
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
            category_id: e.target.categories.value,
            status_id: e.target.status.value,
            assetinsurance: e.target.insurance.value,
            insurancedued: e.target.insurance_due.value
        }
        
        const endpoint = `${config.API_ENDPOINT}/assets`

        ApiService.postDataHalf(endpoint, newProperty)
            .then(() => {
                this.props.history.push('/user/properties')
            })
            .catch(error => {
                console.log(error)
            })
    }


    onChange = (e) =>{
        e.preventDefault()
        const files = Array.from(e.target.files)
        const formData = new FormData()
        files.forEach((file, i) => {
            formData.append(i, file)
        })
        console.log(files)
    }

    render(){
        return (
            <div className='add-property'>
                <div className='header-grid'>
                    <h2>Add New Property</h2>
                    <Link to='/user/properties'>
                        <CloseIcon 
                            className="close-icon" 
                            fontSize="large" 
                        />
                    </Link>
                </div>
                <PropertyForm 
                    handleSubmit={this.submitProperty}
                    onChange={this.onChange}
                    asset={[]}
                    button="Add Property"
                />
            </div>
        )
    }
}

export default AddProperty