import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'

class AddNetwork extends Component {


    addNetwork = (e) => {
        e.preventDefault()
        const newNetwork = {
            network: {
                referencename: e.target.name.value,
                email_phone: e.target.email_phone.value,
                specialevent: e.target.specialevent.value,
                eventdate: e.target.eventdate.value
            }
        }

        console.log(newNetwork)
        const id = 1
        const endpoint = `${config.API_ENDPOINT}/customers/${id}/networks`
        ApiService.postDataHalf(endpoint, newNetwork)
            .then(data => {
                this.props.history.push('/broker/network')
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return (
            <div className="container">
                <div className="header-grid">
                    <h2>Add Network</h2>
                    <Link className="add" to='/broker/network'>Cancel</Link>
                </div>

                <form className="add-form" onSubmit={(e) => {this.addNetwork(e)}}>
                    <h3>Add Network</h3>

                    <div className="form-group">
                        <label htmlFor="name">Reference Name: </label>
                        <input type="text" name="name"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email_phone">Email/Phone: </label>
                        <input type="text" name="email_phone"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="specialevent">Special Event: </label>
                        <input type="text" name="specialevent"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="eventdate">Event Date: </label>
                        <input type="date" name="eventdate"></input>
                    </div>

                    <input type="submit" className="submit" value="Add Network"></input>
                </form>
            </div>
        )
    }
}


export default AddNetwork