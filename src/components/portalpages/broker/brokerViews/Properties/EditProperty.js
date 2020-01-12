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
            error: null,
            files: [],
            contracts: null
        }
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
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
        this.setState({
            files: e
        })
    }

    contractSelectedHandler = (e) => {
        this.setState({
            contracts: e
        })
    }

    removeImage = (file, index) => {
        let newPics = this.state.files
        newPics.splice(index, 1);
        this.setState({
            files: [...newPics]
        })
    }

    editProperty = (e) => {
        e.preventDefault()

        const formData = new FormData();

        const id = this.props.id
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
                formData.append(key, updatedFields[key])
        }

        formData.append('images[]', this.state.files[0])
        // formData.append('contract', this.state.contract)
        

        const endpoint = `${config.API_ENDPOINT}/assets/${id}`

        fetch(endpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${config.API_KEY}`
            }
            })
            .then(res => {
                if(!res.ok)
                    return res.json().then(error => Promise.reject(error))
                return res.json()
            })
            .then(data => {
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
                        <CloseIcon className="action-icon" />
                    </Link>
                </div>
                <PropertyForm 
                    handleSubmit={this.editProperty}
                    asset={this.context.singleAsset}
                    onChange={this.fileSelectedHandler}
                    button="Edit Property"
                    files={this.state.files}
                    removeImage={this.removeImage}
                    contractOnChange={this.contractSelectedHandler}
                />
            </div>
        )
    }
}

export default EditProperty