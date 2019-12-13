import React, {Component} from 'react'
import ApiService from '../../../services/api-service'
import config from '../../../config'

const brokerEndpoint = config.BROKER_ENDPOINT
const csEndpoint = config.CUSTOMER_STATUS_ENDPOINT
const remindersEndpoint = config.REMINDERS_ENDPOINT
const catEndpoint = config.CATEGORIES_ENDPOINT



class ContactForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            brokers: [],
            status: [],
            reminders: [],
            categories: []
        };
    }


    setBrokers = data => {
        this.setState({
            brokers: data.brokers,
            error: null
        })
    }

    setStatus = data => {
        this.setState({
            status: data,
            error: null
        })
    }

    setReminders = data => {
        this.setState({
            reminders: data,
            error: null
        })
    }

    setCategories = data => {
        this.setState({
            categories: data,
            error: null
        })
    }

    componentDidMount(){
        ApiService.getData(
            brokerEndpoint,
            this.setBrokers
        )
        ApiService.getData(
            csEndpoint,
            this.setStatus
        )
        ApiService.getData(
            remindersEndpoint,
            this.setReminders
        )
        ApiService.getData(
            catEndpoint,
            this.setCategories
        )
    }

    render(){
        return (
            <form 
                className= 'edit-form' 
                onSubmit={(e) => this.props.handleSubmit(e)}
            >
                <div className='add-customer-form-group'>
                    <div className='form-group'>
                        <label htmlFor='first_name'>First Name:</label>
                        <input
                            id='first_name'
                            name='first_name'
                            type='text'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='last_name'>Last Name:</label>
                        <input
                            id='last_name'
                            name='last_name'
                            type='text'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            defaultValue={this.props.cust.email}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email_alt'>Alternate Email:</label>
                        <input
                            id='email_alt'
                            name='email_alt'
                            type='email'
                            defaultValue={this.props.cust.secondemail}

                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='phone'>Phone:</label>
                        <input
                            id='phone'
                            name='phone'
                            type='number'
                            defaultValue={this.props.cust.phone}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='address'>Address:</label>
                        <input
                            id='address'
                            name='address'
                            type='text'
                            defaultValue={this.props.cust.adescription4}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='city'>City:</label>
                        <input
                            id='city'
                            name='city'
                            type='text'
                            defaultValue={this.props.cust.adescription3}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='state'>State:</label>
                        <input
                            id='state'
                            name='state'
                            type='text'
                            defaultValue={this.props.cust.adescription2}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='zip_code'>Zip Code:</label>
                        <input
                            id='zip_code'
                            name='zip_code'
                            type='text'
                            defaultValue={this.props.cust.adescription1}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='country'>Country:</label>
                        <input
                            id='country'
                            name='country'
                            type='text'
                            defaultValue={this.props.cust.country}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='tax_id'>Tax ID:</label>
                        <input
                            id='tax_id'
                            name='tax_id'
                            type='number'
                            defaultValue={this.props.cust.taxid}
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='broker'>Broker:</label>
                        <select name='broker'>
                            <option>Select a Broker</option>
                            {this.state.brokers.map(broker => {
                                if(broker.data.name === this.props.cust.broker){
                                   return (
                                    <option key={broker.data.id} value={broker.data.id} selected>{broker.data.name}</option>
                                )}
                                return (
                                    <option key={broker.data.id} value={broker.data.id}>{broker.data.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='status'>Status:</label>
                        <select name='status'>
                            <option>Select a Status</option>
                            {this.state.status.map(s => {
                                if(s.csdesc === this.props.cust.status){
                                   return (
                                    <option key={s.id} value={s.id} selected>{s.csdesc}</option>
                                )}
                                return (
                                    <option key={s.id} value={s.id}>{s.csdesc}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='reminder'>Reminder:</label>
                        <select name='reminder'>
                            <option>Select a Reminder</option>
                            {this.state.reminders.map(r => {
                                if(r.rtype === this.props.cust.remainder){
                                   return (
                                    <option key={r.id} value={r.id} selected>{r.rtype}</option>
                                )}
                                return (
                                    <option key={r.id} value={r.id}>{r.rtype}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='category'>Category:</label>
                        <select name="category">
                            <option>Select a Category</option>
                            {this.state.categories.map(c => {
                                if(c.ccategdesc === this.props.cust.category){
                                   return (
                                    <option key={c.id} value={c.id} selected>{c.ccategdesc}</option>
                                )}
                                return (
                                    <option key={c.id} value={c.id}>{c.ccategdesc}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='anniversary'>Anniversary:</label>
                        <input
                            id='anniversary'
                            name='anniversary'
                            type='date'
                            defaultValue={this.props.cust.anniversary}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='comment'>Comment:</label>
                        <textarea
                            id='comment'
                            name='comment'
                            defaultValue={this.props.cust.comment}
                        >
                        </textarea>
                    </div>
                    <input type='submit' className='submit' text='Save'/>
                </div>
            </form> 
        )
    }
}


export default ContactForm