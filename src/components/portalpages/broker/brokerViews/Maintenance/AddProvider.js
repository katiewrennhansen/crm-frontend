import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import CloseIcon from '@material-ui/icons/Close';
import MaintenanceForm from '../../../../utilities/Forms/MaintenanceForm'

class AddProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null
        }
    }

    submitProvider = (e) => {
        e.preventDefault()
        const newProvider = {
            pemail: e.target.email.value,
            pemail2: e.target.email_alt.value,
            pcompany: e.target.company.value,
            pcontact : e.target.contact.value,
            pphone: e.target.phone.value,
            pcomment: e.target.comment.value,
            puniqueid: e.target.provider_id.value,
            adescription1: e.target.street_name.value,
            adescription2: e.target.city.value,
            adescription3: e.target.state.value,
            adescription4: e.target.zip_code.value,
            adescription5: e.target.country.value,
            category_id: e.target.categories.value,
            cstatus_id: e.target.status.value,
            mainttype_id: e.target.mainttype.value,
            bank_id: e.target.bank_id.value,
            bankaccount: e.target.bankaccount.value
        }

        const endpoint = `${config.API_ENDPOINT}/providers`

        ApiService.postDataHalf(endpoint, newProvider)
            .then(data => {
                this.props.history.push('/broker/maintenance')
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return (
            <div className='add-property'>
                <div className='header-grid'>
                    <h2>Add New Provider</h2>
                    <Link className="close-icon" to='/broker/maintenance'>
                        <CloseIcon
                            className="action-icon" 
                        />
                    </Link>
                </div>
                <div>
                    <MaintenanceForm 
                        handleSubmit={this.submitProvider}
                        provider={[]}
                        id={this.props.id}
                    />
                </div>
            </div>
        )
    }
}

export default AddProvider