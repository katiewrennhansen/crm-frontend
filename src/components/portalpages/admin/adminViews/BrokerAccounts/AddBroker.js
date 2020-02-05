import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import AdminContext from '../../../../../contexts/AdminContext'
import ApiService from '../../../../../services/api-service'
import CloseIcon from '@material-ui/icons/Close';
import BrokerForm from '../../../../utilities/Forms/BrokerForm'


class AddBroker extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    addBroker = (e) => {
        e.preventDefault()
        const endpoint = `${config.API_ENDPOINT}/brokers`
        const newBroker = {
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

        ApiService.postDataHalf(endpoint, newBroker)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(() => {
                        this.props.func.history.push('/dashboard/broker-accounts')
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){  
        return (
            <div className='add-customer'>
                <div className='header-grid'>
                    <h2>Add Broker</h2>
                    <Link className='edit-btn edit-customer' to='/dashboard/broker-accounts'>
                        <CloseIcon 
                            className="add-icon" 
                        />
                    </Link>
                </div>

                <BrokerForm 
                    handleSubmit={this.addBroker}
                    cust={[]}
                />  
            </div>
        )
    }
}

export default AddBroker