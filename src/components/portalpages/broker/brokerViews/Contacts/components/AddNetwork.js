import React, { Component } from 'react'
import config from '../../../../../../config'
import BrokerContext from '../../../../../../contexts/BrokerContext'
import ApiService from '../../../../../../services/api-service'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

class AddNetwork extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            network: []
        }
    }

    setNetwork = (network) => {
        this.setState({
            network
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/customers/${this.props.id}/networks`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setNetwork(data.networks)
            })
            .catch(error => {
                console.log(error)
            })
    }

    addNetwork = (e) => {
        e.preventDefault()
        const newNetwork = {
            network: {
                referencename: e.target.referencename.value,
                email_phone: e.target.email_phone.value,
                specialevent: e.target.specialevent.value,
                eventdate: e.target.eventdate.value,
                typeof: e.target.typeof.value
            }
        }

        const endpoint = `${config.API_ENDPOINT}/customers/${this.props.id}/networks`
        ApiService.postDataHalf(endpoint, newNetwork)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setNetwork(data.networks)
                    })
            })
            .catch(error => {
                console.log(error)
            })

        e.target.referencename.value = ""
        e.target.email_phone.value = ""
        e.target.specialevent.value = ""
        e.target.eventdate.value = ""
        e.target.typeof.value = ""
        const form = document.getElementById('costs-form')
        form.classList.add('hidden')
    }

    deleteNetwork = (id) => {
        const endpoint = `${config.API_ENDPOINT}/customers/${this.props.id}/networks`
        ApiService.deleteDataHalf(endpoint, id)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setNetwork(data.networks)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    toggleForm = () => {
        const form = document.getElementById('costs-form')
        form.classList.toggle('hidden')
        const btn = document.getElementById('c-btn')
        if(form.className === 'sp-form hidden'){
            btn.innerHTML = '+'
        } else {
            btn.innerHTML = '-'
        }
    }

    render() {
        return (
            <div className="customer-networks">
            <div className='header-grid'>
                    <h3>Network</h3>
                    <button className='add' id="c-btn" onClick={this.toggleForm}>+</button>
                </div>
                <form className="sp-form hidden" id="costs-form" onSubmit={(e) => {this.addNetwork(e)}}>
                    <h3>Add Network for {this.props.name}</h3>
                    <div className="form-group">
                        <label htmlFor="referencename">Reference: </label>
                        <input type="text" name="referencename"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="typeof">Relationship: </label>
                        <input type="text" name="typeof"></input>
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
                <table>
                    <thead>
                        <tr>
                            <th>Reference</th>
                            <th>Contact</th>
                            <th>Relationship</th>
                            <th>Special Event</th>
                            <th>Event Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.network.map(n => {
                            return (
                                <tr key={n.data.id}>
                                    <td>{n.data.reference}</td>
                                    <td>{n.data.contact}</td>
                                    <td>{n.data.type}</td>
                                    <td>{n.data.specialevent}</td>
                                    <td>{n.data.eventdate}</td>
                                    <td>
                                        <button className="delete-btn" onClick={() => {this.deleteNetwork(n.data.id)}}>
                                            <DeleteOutlineIcon />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AddNetwork