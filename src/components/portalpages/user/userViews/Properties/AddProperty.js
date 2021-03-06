import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import BrokerContext from '../../../../../contexts/BrokerContext'
import PropertyForm from '../../../../utilities/Forms/PropertyForm'
import CloseIcon from '@material-ui/icons/Close';
import TokenService from '../../../../../services/token-service'

class AddProperty extends Component {
    static contextType = BrokerContext

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            files: [],
            loading: false,
            radioValue: true
        }
    }

    
    fileSelectedHandler = (file) => {
        this.setState({
            files: [...file]
        })
    }

    removeImage = (file, index) => {
        let newPics = this.state.files
        newPics.splice(index, 1);
        this.setState({
            files: [...newPics]
        })
    }

    setValue = e => {
        this.setState({
            radioValue: e.target.value
        })
    }

    submitProperty = (e) => {
        e.preventDefault()
        this.setState({ loading: true })

        const formData = new FormData();

        const newProperty = {
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
            // customer_id: e.target.owner.value,
            // tcustomer_id: e.target.tenant.value,
            // broker_id: e.target.brokers.value,
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
            
            interestrent: e.target.interestrent.value,
            daysbeforeexp: e.target.daysbeforeexp.value,
            warranty: e.target.warranty.value
        }

        for (const key in newProperty) {
            formData.append(key, newProperty[key])
        }

        this.state.files.map(file => formData.append('images[]', file))

        fetch(`${config.API_ENDPOINT}/assets`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
            })
            .then(() => {
                this.props.history.push('/user/properties')
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
            })
    }

    render(){
        return (
            <div className='add-property'>
                <div className='header-grid'>
                    <h2>Add New Property</h2>
                    <Link className="close-icon" to='/user/properties'>
                        <CloseIcon 
                            className="action-icon" 
                            />
                    </Link>
                </div>
                <PropertyForm 
                    handleSubmit={this.submitProperty}
                    onChange={this.fileSelectedHandler}
                    asset={[]}
                    button="Add Property"
                    files={this.state.files}
                    removeImage={this.removeImage}
                    loading={this.state.loading}
                    setValue={this.setValue}
                />
            </div>
        )
    }
}

export default AddProperty