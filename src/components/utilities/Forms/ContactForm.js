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
            categories: [],
            banks: []
        };
    }


    setBrokers = data => {
        this.setState({
            brokers: data.brokers
        })
    }

    setStatus = data => {
        this.setState({
            status: data
        })
    }

    setReminders = data => {
        this.setState({
            reminders: data
        })
    }

    setCategories = data => {
        this.setState({
            categories: data
        })
    }

    setBanks = banks => {
        this.setState({
            banks
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
        ApiService.getData(
            `${config.API_ENDPOINT}/banks`,
            this.setBanks
        )
    }

    render(){
        return (
            <form 
                className= 'add-property-form' 
                onSubmit={(e) => this.props.handleSubmit(e)}
            >
                <div className="inner-form-content">
                <p>Please fill out all forms marked with an <span className="required">*</span></p>
                <div className="form-content-section">
                    <h3>Customer Information</h3>
                        <div className='form-group row'>
                            <div>
                                <label htmlFor='first_name'>First Name<span className="required">*</span></label>
                                <input
                                    id='first_name'
                                    name='first_name'
                                    type='text'
                                    defaultValue={this.props.cust.firstname}
                                />
                            </div>
                            <div>
                                <label htmlFor='last_name'>Last Name<span className="required">*</span></label>
                                <input
                                    id='last_name'
                                    name='last_name'
                                    type='text'
                                    defaultValue={this.props.cust.lastname}
                                />
                            </div>
                        </div>
                        
                        <div className='form-group row'>
                            <div>
                                <label htmlFor='email'>Email<span className="required">*</span></label>
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    defaultValue={this.props.cust.email}
                                />
                            </div>
                                <div>
                                <label htmlFor='email_alt'>Alternate Email<span className="required">*</span></label>
                                <input
                                    id='email_alt'
                                    name='email_alt'
                                    type='email'
                                    defaultValue={this.props.cust.secondemail}
                                />
                            </div>
                        </div>
                        
                        <div className='form-group row'>
                            <div>
                                <label htmlFor='phone'>Phone<span className="required">*</span></label>
                                <input
                                    id='phone'
                                    name='phone'
                                    type='number'
                                    defaultValue={this.props.cust.phone}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-content-section">
                        <h3>Address</h3>
                        <div className='form-group'>
                            <label htmlFor='address'>Address<span className="required">*</span></label>
                            <input
                                id='address'
                                name='address'
                                type='text'
                                defaultValue={this.props.cust.adescription1}
                            />
                        </div>
                        <div className='form-group row'>
                            <div>
                                <label htmlFor='city'>City<span className="required">*</span></label>
                                <input
                                    id='city'
                                    name='city'
                                    type='text'
                                    defaultValue={this.props.cust.adescription2}
                                />
                            </div>
                            <div>
                                <label htmlFor='state'>State<span className="required">*</span></label>
                                <input
                                    id='state'
                                    name='state'
                                    type='text'
                                    defaultValue={this.props.cust.adescription3}
                                />
                            </div>
                        </div>
                        <div className='form-group row'>
                            <div>
                                <label htmlFor='zip_code'>Zip Code<span className="required">*</span></label>
                                <input
                                    id='zip_code'
                                    name='zip_code'
                                    type='text'
                                    defaultValue={this.props.cust.adescription4}
                                />
                            </div>
                            <div>
                                <label htmlFor='country'>Country<span className="required">*</span></label>
                                <input
                                    id='country'
                                    name='country'
                                    type='text'
                                    defaultValue={this.props.cust.country}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-content-section">
                        <h3>Bank Information</h3>
                        <div className="form-group row">
                            <div>
                                <label htmlFor="bank_id">Bank Name<span className="required">*</span></label>
                                <select name="bank_id">
                                    <option value="">Select a Bank</option>
                                    {this.state.banks.map(b =>
                                        (this.props.cust.bankname && b.bank_id === this.props.cust.bankname)
                                            ? <option key={b.id} value={b.id} selected>{b.bankname}</option>
                                            : <option key={b.id} value={b.id}>{b.bankname}</option>
                                    )}
                                </select>                            
                            </div>
                            <div>
                                <label htmlFor="bankaccount">Bank Account<span className="required">*</span></label>
                                <input type="text" name="bankaccount" defaultValue={this.props.cust.bankaccount}></input>
                            </div>
                        </div>
                    </div>

                    <div className="form-content-section">
                        <h3>Additional Information</h3>
                        <div className='form-group row'>
                            <div>
                                <label htmlFor='broker'>Broker<span className="required">*</span></label>
                                <select name='broker'>
                                    <option>Select a Broker</option>
                                    {this.state.brokers.map(broker => 
                                        (broker.data.name === this.props.cust.broker)
                                            ? <option key={broker.data.id} value={broker.data.id} selected>{broker.data.name}</option>
                                            : <option key={broker.data.id} value={broker.data.id}>{broker.data.name}</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label htmlFor='status'>Status<span className="required">*</span></label>
                                <select name='status'>
                                    <option>Select a Status</option>
                                    {this.state.status.map(s => 
                                        (s.csdesc === this.props.cust.status)
                                            ? <option key={s.id} value={s.id} selected>{s.csdesc}</option>
                                            : <option key={s.id} value={s.id}>{s.csdesc}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        
                        <div className='form-group row'>
                            <div>
                                <label htmlFor='reminder'>Reminder<span className="required">*</span></label>
                                <select name='reminder'>
                                    <option>Select a Reminder</option>
                                    {this.state.reminders.map(r => 
                                        (r.rtype === this.props.cust.remainder)
                                            ? <option key={r.id} value={r.id} selected>{r.rtype}</option>
                                            : <option key={r.id} value={r.id}>{r.rtype}</option>
                                    )}
                                </select>
                            </div>
                            
                            <div>
                                <label htmlFor='title'>Title<span className="required">*</span></label>
                                <select name="title">
                                    <option value="">Select a Title</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Miss.">Miss.</option>    

                                </select>
                            </div>
                            <div>
                                <label htmlFor='profession'>Profession<span className="required">*</span></label>
                                <input
                                    id='profession'
                                    name='profession'
                                    type='text'
                                    defaultValue={this.props.cust.profession}
                                />   
                            </div>
                            <div>
                                <label htmlFor='marital'>Marital<span className="required">*</span></label>
                                <select name="marital">
                                    <option value="">Select a Marital Status</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>    
                                    <option value="divorce">Divorced</option>  
                                    <option value="widow">Widow</option>       
                                      

                                </select>
                            </div>
                            <div>
                                <label htmlFor='category'>Category<span className="required">*</span></label>
                                <select name="category">
                                    <option>Select a Category</option>
                                    {this.state.categories.map(c => 
                                        (c.ccategdesc === this.props.cust.category)
                                            ? <option key={c.id} value={c.id} selected>{c.ccategdesc}</option>
                                            : <option key={c.id} value={c.id}>{c.ccategdesc}</option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <label htmlFor='gender'>Gender<span className="required">*</span></label>
                                <select name="gender">
                                    <option value="">Select one</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>    
                                    
                                </select>
                            </div>
                       
                        <div className='form-group'>
                            <label htmlFor='anniversary'>Anniversary<span className="required">*</span></label>
                            <input
                                id='anniversary'
                                name='anniversary'
                                type='date'
                                defaultValue={this.props.cust.anniversary}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='tax_id'>Tax ID<span className="required">*</span></label>
                            <input
                                id='tax_id'
                                name='tax_id'
                                type='text'
                                defaultValue={this.props.cust.taxid}
                            />
                        </div>

                    </div>
                        <div className='form-group'>
                            <label htmlFor='comment'>Comment</label>
                            <textarea
                                id='comment'
                                name='comment'
                                defaultValue={this.props.cust.comment}
                                rows="5"
                            >
                            </textarea>
                        </div>
                    </div>

                    <input type='submit' className='submit' text='Save'/>
                </div>
            </form> 
        )
    }
}


export default ContactForm