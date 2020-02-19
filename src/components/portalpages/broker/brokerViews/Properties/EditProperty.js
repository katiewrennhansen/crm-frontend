import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import BrokerContext from '../../../../../contexts/BrokerContext'
import CloseIcon from '@material-ui/icons/Close';
import PropertyForm from '../../../../utilities/Forms/PropertyForm'
import './Properties.css'
import TokenService from '../../../../../services/token-service'

class EditProperty extends Component {
    static contextType = BrokerContext

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            files: [],
            contract: [],
            loading: false,
            radioValue: true
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
        console.log(e)
        
        const all = [...e, ...this.state.files]
        const fileList = Array.from(new Set(all.map(f => f.name))).map(name => {
            return e.find(a => a.name === name)
        })
        this.setState({
            files: fileList
        })
    }

    contractSelectedHandler = (e) => {
        this.setState({
            contract: e
        })
    }

    removeImage = (file) => {
        let newPics = this.state.files.filter(f => f.name !== file.name)
        this.setState({
            files: [...newPics]
        })
    }

    setValue = e => {
        this.setState({
            radioValue: e.target.value
        })
    }


    editProperty = (e) => {
        e.preventDefault()
        this.setState({ loading: true })

        const formData = new FormData();
        const id = this.props.id

        const updatedFields = {
            assetdesc: e.target.description.value,
            assetinsurance: e.target.insurance.value,
            insurancedued : e.target.insurance_due.value,
            assetprice: e.target.price.value,
            futureprice: e.target.future_price.value,
            assetrent: e.target.assetrent.value,
            futurerent: e.target.futurerent.value,
            assetstart: e.target.assetstart.value,
            assetdue: e.target.assetdue.value,
            assettype_id: e.target.asset_type.value,
            customer_id: e.target.owner.value,
            tcustomer_id: e.target.tenant.value,
            broker_id: e.target.brokers.value,
            processt_id: e.target.process.value,
            step_id: e.target.steps.value,
            category_id: e.target.category.value,
            stepdate: e.target.step_date.value,
            status_id: e.target.status.value,
            adescription1: e.target.street_name.value,
            adescription2: e.target.city.value,
            adescription3: e.target.state.value,
            adescription4: e.target.zip_code.value,
            adescription5: e.target.country.value,
            emailnewcontract: this.state.radioValue,
            rentadjustment: e.target.rentadjustment.value,
            endorsment: e.target.endorsment.value,
            interestrent: e.target.interestrent.value,
            daysbeforeexp: e.target.daysbeforeexp.value,
            warranty: e.target.warranty.value
        }

        for (const key in updatedFields) {
            if (updatedFields[key] !== '')
                formData.append(key, updatedFields[key])
        }
        this.state.files.map(file => formData.append('images[]', file))

        formData.append('contract', this.state.contract[0])
        
        fetch(`${config.API_ENDPOINT}/assets/${id}`, {
            method: 'PATCH',
            body: formData,
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
            })
            .then(() => {
                this.props.history.history.push('/broker/properties')
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
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
                    contracts={this.state.contracts}
                    removeImage={this.removeImage}
                    contractOnChange={this.contractSelectedHandler}
                    loading={this.state.loading}
                    contract={this.state.contract}
                    setValue={this.setValue}
                    id={this.props.history.match.params.id}
                />
            </div>
        )
    }
}

export default EditProperty