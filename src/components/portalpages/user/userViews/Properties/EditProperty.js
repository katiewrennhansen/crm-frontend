import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import UserContext from '../../../../../contexts/UserContext'
import CloseIcon from '@material-ui/icons/Close';
import PropertyForm from '../../../../utilities/Forms/PropertyForm'

class EditProperty extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props)
        this.state = {
            singleAsset: {},
            files: [],
            contract: [],
            loading: false,
            radioValue: true
        }
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this)

    }

    setSingleAsset = singleAsset => {
        this.setState({
            singleAsset
        })
    }

    componentDidMount(){
        ApiService.getDataHalf(`${config.API_ENDPOINT}/assets/${this.props.id}`)
            .then(data => {
                this.setSingleAsset(data.data)
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
            contract: e
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

    editProperty = (e) => {
        e.preventDefault()
        this.setState({ loading: true })
        const formData = new FormData();
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
            processt_id: e.target.process.value,
            step_id: e.target.steps.value,
            stepdate: e.target.step_date.value,
            status_id: e.target.status.value,
            assetinsurance: e.target.insurance.value,
            insurancedued : e.target.insurance_due.value,
            emailnewcontract: this.state.radioValue,
            rentadjustment: e.target.rentadjustment.value,
            endorsment: e.target.endorsment.value,
            interestrent: e.target.interestrent.value,
            daysbeforeexp: e.target.daysbeforeexp.value
        }

        for (const key in updatedFields) {
            if (updatedFields[key] !== '' || undefined)
                formData.append(key, updatedFields[key])
        }

        this.state.files.map(file => formData.append('images[]', file))
        formData.append('contract', this.state.contract[0])

        fetch(`${config.API_ENDPOINT}/assets/${this.props.id}`, {
            method: 'PATCH',
            body: formData,
            headers: {
                'Authorization': `Bearer ${config.API_KEY}`
            }
            })
            .then(res => {
                if(!res.ok)
                    return res.json().then(error => Promise.reject(error))
                return res
            })
            .then(data => {
                this.props.history.history.push('/user/properties')
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
            })
    }

    render(){
        const asset = this.state.singleAsset
        const id = this.props.id
        return (
            <div className='edit-property'>
                <div className='header-grid'>
                    <h2>Edit {asset.adescription4}</h2>
                    <Link className="close-icon" to={`/user/properties/${id}`}>
                        <CloseIcon 
                            className="action-icon" 
                        />
                    </Link>
                </div>
                <PropertyForm 
                    handleSubmit={this.editProperty}
                    asset={asset}
                    onChange={this.fileSelectedHandler}
                    button="Edit Property"
                    files={this.state.files}
                    removeImage={this.removeImage}
                    loading={this.state.loading}
                    contractOnChange={this.contractSelectedHandler}
                    contract={this.state.contract}
                    setValue={this.setValue}
                />
            </div>
        )
    }
}

export default EditProperty