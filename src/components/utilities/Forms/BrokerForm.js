import React, {Component} from 'react'
import ApiService from '../../../services/api-service'
import config from '../../../config'

class BrokerForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            banks: []
        };
    }


    setBrokers = data => {
        this.setState({
            brokers: data.brokers
        })
    }

    setBanks = banks => {
        this.setState({
            banks
        })
    }

    componentDidMount(){
        ApiService.getData(
            `${config.API_ENDPOINT}/brokers`,
            this.setBrokers
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
                    <h3>Broker Information</h3>
                        <div className='form-group row'>
                            <div>
                                <label htmlFor='first_name'>First Name<span className="required">*</span></label>
                                <input
                                    id='first_name'
                                    name='first_name'
                                    type='text'
                                />
                            </div>
                            <div>
                                <label htmlFor='last_name'>Last Name<span className="required">*</span></label>
                                <input
                                    id='last_name'
                                    name='last_name'
                                    type='text'
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
                                    type='text'
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
                                defaultValue={this.props.cust.adescription4}
                            />
                        </div>
                        <div className='form-group row'>
                            <div>
                                <label htmlFor='city'>City<span className="required">*</span></label>
                                <input
                                    id='city'
                                    name='city'
                                    type='text'
                                    defaultValue={this.props.cust.adescription3}
                                />
                            </div>
                            <div>
                                <label htmlFor='state'>State<span className="required">*</span></label>
                                <input
                                    id='state'
                                    name='state'
                                    type='text'
                                    defaultValue={this.props.cust.adescription2}
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
                                    defaultValue={this.props.cust.adescription1}
                                />
                            </div>
                            <div>
                                <label htmlFor='country'>Country<span className="required">*</span></label>
                                <input
                                    id='country'
                                    name='country'
                                    type='text'
                                    defaultValue={this.props.cust.adescription5}
                                />
                            </div>
                        </div>
                    </div>


                    <div className="form-content-section">
                        <h3>Bank Information</h3>
                        <div className="form-group col3">
                            <div>
                                <label htmlFor="bank">Bank Name<span className="required">*</span></label>
                                <select name="bank">
                                    <option value="">Select a Bank</option>
                                    {this.state.banks.map(b =>
                                        <option key={b.id} value={b.bankname}>{b.bankname}</option>
                                    )}
                                </select>                            
                            </div>
                            <div>
                                <label htmlFor="bankaccount">Bank Account<span className="required">*</span></label>
                                <input 
                                    type="text" 
                                    name="bankaccount" 
                                    defaultValue={this.props.cust.bankaccount}
                                />
                            </div>
                            <div>
                                <label htmlFor="bankcode">Bank Code<span className="required">*</span></label>
                                <input 
                                    type="text" 
                                    name="bankcode"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-content-section">
                        <h3>Additional Information</h3>
                        <div className="form-group row">
                            <div>
                                <label htmlFor='buniqueid'>Unique ID<span className="required">*</span></label>
                                <input
                                    id='buniqueid'
                                    name='buniqueid'
                                    type='text'
                                    defaultValue={this.props.cust.taxid}
                                />
                            </div>
                            <div>
                                <label htmlFor='comment'>Comment<span className="required">*</span></label>
                                <input
                                    id='comment'
                                    name='comment'
                                    type='text'
                                    defaultValue={this.props.cust.comment}
                                />
                            </div>
                        </div>
                    </div>

                    <input type='submit' className='submit' text='Save'/>
                </div>
            </form> 
        )
    }
}


export default BrokerForm