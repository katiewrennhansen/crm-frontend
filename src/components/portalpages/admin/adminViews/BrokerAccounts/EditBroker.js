import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import AdminContext from '../../../../../contexts/AdminContext'
import ApiService from '../../../../../services/api-service'
import CloseIcon from '@material-ui/icons/Close';
import BrokerForm from '../../../../utilities/Forms/BrokerForm'

class EditBroker extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            brokers: [],
        };
    }

    setBroker = brokers => {
        this.setState({
            brokers
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/brokers/${this.props.id}`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setBroker(data.data)
            })
            .catch(error => {
                this.setState({ error })
            })            
    }

    editBroker = (e) => {
        e.preventDefault()
        const id = this.props.id
        const endpoint = `${config.API_ENDPOINT}/brokers`

        let updatedBroker = {}
        const updatedFields = {
            bemail: e.target.email.value,
            bemail2: e.target.email_alt.value,
            bcomment: e.target.comment.value,
            // buniqueid: ,
            adescription5: e.target.country.value,
            adescription4: e.target.address.value,
            adescription3: e.target.city.value,
            adescription2: e.target.state.value,
            adescription1: e.target.zip_code.value,
            bankaccount: e.target.bankaccount.value,
            bank: e.target.bank.value,
            bankcode: e.target.bankcode.value,
        }

        for (const key in updatedFields) {
            if (updatedFields[key] !== '')
                updatedBroker[key] = updatedFields[key]
        }

        console.log(updatedBroker)

        ApiService.updateDataHalf(endpoint, id, updatedBroker)
            .then(data => {
                // ApiService.getDataHalf(endpoint)
                    // .then(data => {
                    //     this.setBroker(data.brokers)
                    // })
                    // .then(() => {
                    //     this.props.func.history.push(`/dashboard/broker-accounts/${id}`)
                    // })
                    this.props.func.history.push(`/dashboard/broker-accounts/${id}`)

            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){ 
        return (
            <div className='add-customer'>
                <div className='header-grid'>
                    <h2>Edit Broker</h2>
                    <Link to={`/dashboard/broker-accounts/${this.props.id}`} className='edit-btn edit-customer'>
                        <CloseIcon 
                            className="add-icon" 
                        />
                    </Link>
                </div>

                <BrokerForm
                    cust={this.state.brokers}
                    handleSubmit={this.editBroker}
                />
            </div>
        )
    }
}

export default EditBroker