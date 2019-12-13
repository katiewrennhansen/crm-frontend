import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import BrokerContext from '../../../../../contexts/BrokerContext'

class AddProvider extends Component {
    static contextType = BrokerContext

    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            status: [],
            mainttype: []
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



    componentDidMount(){
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
            adescription4: e.target.street_name.value,
            adescription5: e.target.city.value,
            adescription2: e.target.state.value,
            adescription3: e.target.zip_code.value,
            adescription1: e.target.country.value,
            category_id: e.target.categories.value,
            cstatus_id: e.target.status.value,
            mainttype_id: e.target.mainttype.value
        }

        console.log(newProvider)

        const endpoint = `${config.API_ENDPOINT}/providers`

        ApiService.postDataHalf(endpoint, newProvider)
            .then(data => {
                console.log(data)
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
                    <Link className="add" to='/broker/maintenance'>Cancel</Link>
                </div>
                <div>
                    <form className="add-property-form" onSubmit={(e) => {this.submitProvider(e)}}>

                    <h3>Company Information</h3>
                        <div className="form-group">
                            <label htmlFor="company">Company: </label>
                            <input type="text" name="company"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact">Contact Name: </label>
                            <input type="text" name="contact"></input>
                        </div>
                      
                        <div className="form-group">
                            <label htmlFor="phone">Phone: </label>
                            <input type="number" name="phone"></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="text" name="email"></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_alt">Alternate Email: </label>
                            <input type="text" name="email_alt"></input>
                        </div>
                     
                        <h3>Address</h3>
                        <div className="form-group">
                            <label htmlFor="street_name">Street Name: </label>
                            <input type="text" name="street_name"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City: </label>
                            <input type="text" name="city"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State: </label>
                            <input type="text" name="state"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="zip_code">Zip Code: </label>
                            <input type="text" name="zip_code"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country: </label>
                            <input type="text" name="country"></input>
                        </div>

                        <h3>Other Information</h3>
                        <div className="form-group">
                            <label htmlFor="status">Status: </label>
                            <select name="status">
                                <option value="">Select a Status</option>
                                {this.state.status.map(s => {
                                    return (
                                    <option key={s.id} value={s.id}>{s.csdesc}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="categories">Category: </label>
                            <select name="categories">
                                <option value="">Select a Category</option>
                                {this.state.categories.map(s => {
                                    return (
                                    <option key={s.id} value={s.id}>{s.ccategdesc}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="mainttype">Maintenance Type: </label>
                            <select name="mainttype">
                                <option value="">Select a Type</option>
                                {this.state.mainttype.map(m => {
                                    return (
                                    <option key={m.id} value={m.id}>{m.maindescr}</option>
                                    )
                                })}
                            </select>
                        </div> 
                        <div className="form-group">
                            <label htmlFor="comment">Comment: </label>
                            <textarea name="comment"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="provider_id">Provider ID: </label>
                            <input type="number" name="provider_id"></input>
                        </div>

                        <input type="submit" className="submit" value="Add Provider"></input>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddProvider