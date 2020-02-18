import React, { Component } from 'react'
import ApiService from '../../../services/api-service'
import config from '../../../config'
import BrokerContext from '../../../contexts/BrokerContext'

class MaintenanceForm extends Component {
    static contextType = BrokerContext

    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            status: [],
            mainttype: [],
            provider: [],
            banks: []
        }
    }

    setCategories = (categories) => {
        this.setState({
            categories
        })
    }

    setStatus = (status) => {
        this.setState({
            status
        })
    }

    setMaintType = (mainttype) => {
        this.setState({
            mainttype
        })
    }

    setProvider = (provider) => {
        this.setState({
            provider
        })
    }

    setBanks = (banks) => {
        this.setState({
            banks
        })
    }

    componentDidMount(){
        if(this.props.id){
            ApiService.getDataHalf(`${config.API_ENDPOINT}/providers/${this.props.id}`)
                .then(data => {
                    this.setProvider(data.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        ApiService.getDataHalf(`${config.API_ENDPOINT}/categories`)
            .then(data => {
                this.setCategories(data)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/cstatuses`)
            .then(data => {
                this.setStatus(data)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/mainttypes`)
            .then(data => {
                this.setMaintType(data)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/banks`)
            .then(data => {
                this.setBanks(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        const info = this.props.provider
        return (
            <form className="add-property-form" onSubmit={(e) => {this.props.handleSubmit(e)}}>
                <div className="inner-form-content">
                    <p>Please fill out all forms marked with an <span className="required">*</span></p>
                    <div className="form-content-section">
                        <h3>Company Information</h3>
                        <div className="form-group">
                            <label htmlFor="company">Company Name<span className="required">*</span></label>
                            <input 
                                type="text" 
                                name="company" 
                                defaultValue={info.name}
                            >
                            </input>
                        </div>
                        <div className="form-group row">
                            <div>
                                <label htmlFor="contact">Contact Name<span className="required">*</span></label>
                                <input type="text" name="contact" defaultValue={info.contact}></input>
                            </div>
                            <div>
                                <label htmlFor="phone">Phone<span className="required">*</span></label>
                                <input type="text" name="phone" defaultValue={info.phone}></input>
                            </div>
                        </div>
                        
                        <div className="form-group row">
                            <div>
                                <label htmlFor="email">Email<span className="required">*</span></label>
                                <input type="text" name="email" defaultValue={info.email}></input>
                            </div>
                            <div>
                                <label htmlFor="email_alt">Alternate Email<span className="required">*</span></label>
                                <input type="text" name="email_alt" defaultValue={info.secondemail}></input>
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-content-section">
                        <h3>Address</h3>
                        <div className="form-group">
                            <label htmlFor="street_name">Street Name<span className="required">*</span></label>
                            <input type="text" name="street_name" defaultValue={info.adescription1}></input>
                        </div>
                        <div className="form-group row">
                            <div>
                                <label htmlFor="city">City<span className="required">*</span></label>
                                <input type="text" name="city" defaultValue={info.adescription2}></input>
                            </div>
                            <div>
                                <label htmlFor="state">State<span className="required">*</span></label>
                                <input type="text" name="state" defaultValue={info.adescription3}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div>
                                <label htmlFor="zip_code">Zip Code<span className="required">*</span></label>
                                <input type="text" name="zip_code" defaultValue={info.adescription4}></input>
                            </div>
                            <div>
                                <label htmlFor="country">Country<span className="required">*</span></label>
                                <input type="text" name="country" defaultValue={info.adescription5}></input>
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
                                        (info.bank && b.bank_id === info.bankname)
                                            ? <option key={b.id} value={b.id} selected>{b.bankname}</option>
                                            : <option key={b.id} value={b.id}>{b.bankname}</option>
                                    )}
                                </select>                            
                            </div>
                            <div>
                                <label htmlFor="bankaccount">Bank Account<span className="required">*</span></label>
                                <input type="text" name="bankaccount" defaultValue={info.bankaccount}></input>
                            </div>
                        </div>
                    </div>

                    <div className="form-content-section">
                        <h3>Other Information</h3>
                        <div className="form-group row">
                            <div>
                                <label htmlFor="mainttype">Maintenance Type<span className="required">*</span></label>
                                <select name="mainttype">
                                    <option value="">Select a Type</option>
                                    {this.state.mainttype.map(m => 
                                        (m.maindescr === info.typeservice)
                                            ? <option key={m.id} value={m.id} selected>{m.maindescr}</option>
                                            : <option key={m.id} value={m.id}>{m.maindescr}</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="status">Status<span className="required">*</span></label>
                                <select name="status">
                                    <option value="">Select a Status</option>
                                    {this.state.status.map(s => 
                                        (s.csdesc === info.status)
                                            ? <option key={s.id} value={s.id} selected>{s.csdesc}</option>
                                            : <option key={s.id} value={s.id}>{s.csdesc}</option>
                                    )}
                                </select>
                            </div>
                        </div> 

                        <div className="form-group row">
                            <div>
                                <label htmlFor="categories">Category<span className="required">*</span></label>
                                <select name="categories">
                                    <option value="">Select a Category</option>
                                    {this.state.categories.map(s => 
                                        (s.ccategdesc === info.category)
                                            ? <option key={s.id} value={s.id} selected>{s.ccategdesc}</option>
                                            : <option key={s.id} value={s.id}>{s.ccategdesc}</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="provider_id">Provider ID<span className="required">*</span></label>
                                <input type="text" name="provider_id" defaultValue={info.taxid}></input>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="comment">Comment<span className="required">*</span></label>
                            <textarea name="comment" rows="5" defaultValue={info.comment}></textarea>
                        </div>
                    </div>
                    
                    <input type="submit" className="submit" value="Edit Provider"></input>
                </div>
            </form>
        )
    }
}

export default MaintenanceForm