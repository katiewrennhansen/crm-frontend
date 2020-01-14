import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import BrokerContext from '../../../../../contexts/BrokerContext'
import PropertyForm from '../../../../utilities/Forms/PropertyForm'
import CloseIcon from '@material-ui/icons/Close';

class AddProperty extends Component {
    static contextType = BrokerContext

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            files: [],
            loading: false
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

    submitProperty = (e) => {
        e.preventDefault()

        this.setState({ loading: true })

        const formData = new FormData();
        console.log(this.state.files)

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
            processt_id: e.target.process.value,
            step_id: e.target.steps.value,
            stepdate: e.target.step_date.value,
            category_id: e.target.categories.value,
            status_id: e.target.status.value,
            assetinsurance: e.target.insurance.value,
            insurancedued: e.target.insurance_due.value
        }

        for (const key in newProperty) {
            formData.append(key, newProperty[key])
        }

        this.state.files.map(file => formData.append('images[]', file))

        fetch(`${config.API_ENDPOINT}/assets`, {
            method: 'POST',
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
                />
            </div>
        )
    }
}

export default AddProperty