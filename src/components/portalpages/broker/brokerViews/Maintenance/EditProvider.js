import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import BrokerContext from '../../../../../contexts/BrokerContext'
import CloseIcon from '@material-ui/icons/Close';


class EditProvider extends Component {
    static contextType = BrokerContext

    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            status: [],
            mainttype: [],
            provider: []
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

    setProvider= (provider) => {
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

        console.log(updatedContent)

        const endpoint = `${config.API_ENDPOINT}/providers`

        ApiService.postDataHalf(endpoint, id, updatedContent)
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
        this.props.history.history.push('/broker/maintenance')
    }

    render(){
        const info = this.state.provider
        return (
            <div className='add-property'>
                <div className='header-grid'>
                    <h2>Edit Provider</h2>
                    <Link className="close-icon" to='/broker/maintenance'>
                        <CloseIcon fontSize="large" />
                    </Link>
                </div>
                <div>
                    <form className="add-property-form" onSubmit={(e) => {this.editProvider(e)}}>

                    <h3>Company Information</h3>
                        <div className="form-group">
                            <label htmlFor="company">Company: </label>
                            <input 
                                type="text" 
                                name="company" 
                                defaultValue={info.name}
                            >
                            </input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact">Contact Name: </label>
                            <input type="text" name="contact" defaultValue={info.contact}></input>
                        </div>
                      
                        <div className="form-group">
                            <label htmlFor="phone">Phone: </label>
                            <input type="number" name="phone" defaultValue={info.phone}></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="text" name="email" defaultValue={info.email}></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_alt">Alternate Email: </label>
                            <input type="text" name="email_alt" defaultValue={info.secondemail}></input>
                        </div>
                     
                        <h3>Address</h3>
                        <div className="form-group">
                            <label htmlFor="street_name">Street Name: </label>
                            <input type="text" name="street_name" defaultValue={info.adescription4}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City: </label>
                            <input type="text" name="city" defaultValue={info.adescription5}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State: </label>
                            <input type="text" name="state" defaultValue={info.adescription2}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="zip_code">Zip Code: </label>
                            <input type="text" name="zip_code" defaultValue={info.adescription3}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country: </label>
                            <input type="text" name="country" defaultValue={info.adescription1}></input>
                        </div>

                        <h3>Other Information</h3>
                        <div className="form-group">
                            <label htmlFor="status">Status: </label>
                            <select name="status">
                                <option value="">Select a Status</option>
                                {this.state.status.map(s => {
                                    if(s.csdesc === info.status){
                                        return (
                                            <option key={s.id} value={s.id} selected>{s.csdesc}</option>
                                        )
                                    }
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
                                    if(s.ccategdesc === info.category){
                                        return (
                                            <option key={s.id} value={s.id} selected>{s.ccategdesc}</option>
                                        )
                                    }
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
                                    if(m.maindescr === info.typeservice){
                                        return (
                                            <option key={m.id} value={m.id} selected>{m.maindescr}</option>
                                            )
                                    }
                                    return (
                                    <option key={m.id} value={m.id}>{m.maindescr}</option>
                                    )
                                })}
                            </select>
                        </div> 
                        <div className="form-group">
                            <label htmlFor="comment">Comment: </label>
                            <textarea name="comment" defaultValue={info.comment}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="provider_id">Provider ID: </label>
                            <input type="number" name="provider_id" defaultValue={info.taxid}></input>
                        </div>

                        <input type="submit" className="submit" value="Edit Provider"></input>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditProvider