import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import BrokerContext from '../../../../../contexts/BrokerContext'
import CloseIcon from '@material-ui/icons/Close';
import PropertyForm from '../../../../utilities/Forms/PropertyForm'
import './Properties.css'

class EditProperty extends Component {
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

    componentDidMount(){
        ApiService.getDataHalf(`${config.API_ENDPOINT}/assets/${this.props.id}`)
            .then(data => {
                this.context.setSingleAsset(data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    fileSelectedHandler = (e) => {
        this.updateFiles(e.target.files)
    }

    editProperty = (e) => {
        e.preventDefault()
        const id = this.props.id
        const updatedContent = {}
        const updatedFields = {
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

        for (const key in updatedFields) {
            if (updatedFields[key] !== '')
                updatedContent[key] = updatedFields[key]
        }

        const endpoint = `${config.API_ENDPOINT}/assets`

        ApiService.updateDataHalf(endpoint, id, updatedContent)
            .then(() => {
                this.props.history.history.push('/broker/properties')
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
                <div className='header-grid'>
                    <h2>Edit {asset.adescription4}</h2>
                    <Link className="close-icon" to={`/broker/properties/${id}`}>
                        <CloseIcon 
                            fontSize="large" 
                        />
                    </Link>
                </div>
                <PropertyForm 
                    handleSubmit={this.editProperty}
                    asset={this.context.singleAsset}
                    button="Edit Property"
                />
            </div>
        )
    }
}

export default EditProperty