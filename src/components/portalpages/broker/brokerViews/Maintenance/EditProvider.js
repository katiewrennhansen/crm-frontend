import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import CloseIcon from '@material-ui/icons/Close';
import MaintenanceForm from '../../../../utilities/Forms/MaintenanceForm'

class EditProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            provider: [],
            error: null
        }
    }

    setProvider= provider => {
        this.setState({
            provider
        })
    }

    componentDidMount(){
        ApiService.getDataHalf(`${config.API_ENDPOINT}/providers/${this.props.id}`)
            .then(data => {
                this.setProvider(data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    editProvider = (e) => {
        e.preventDefault()
        const id = this.props.id
        let updatedContent = {}
        const updatedFields = {
            pemail: e.target.email.value,
            pemail2: e.target.email_alt.value,
            pcompany: e.target.company.value,
            pcontact : e.target.contact.value,
            pphone: e.target.phone.value,
            pcomment: e.target.comment.value,
            puniqueid: e.target.provider_id.value,
            adescription4: e.target.street_name.value,
            adescription5: e.target.city.value,
            adescription2: e.target.state.value,
            adescription3: e.target.zip_code.value,
            adescription1: e.target.country.value,
            category_id: e.target.categories.value,
            cstatus_id: e.target.status.value,
            mainttype_id: e.target.mainttype.value
        }

        for (const key in updatedFields) {
            if (updatedFields[key] !== '')
                updatedContent[key] = updatedFields[key]
        }
        const endpoint = `${config.API_ENDPOINT}/providers`

        ApiService.updateDataHalf(endpoint, id, updatedContent)
            .catch(error => {
                console.log(error)
            })
        this.props.history.history.push('/broker/maintenance')
    }

    render(){
        return (
            <div className='edit-property'>
                <div className='header-grid'>
                    <h2>Edit Provider</h2>
                    <Link className="close-icon" to='/broker/maintenance'>
                        <CloseIcon
                            className="action-icon" 
                        />
                    </Link>
                </div>
                <MaintenanceForm 
                    handleSubmit={this.editProvider}
                    provider={this.state.provider}
                    id={this.props.id}
                />
            </div>
        )
    }
}

export default EditProvider