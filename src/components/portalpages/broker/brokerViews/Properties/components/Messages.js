import React, { Component } from 'react'
import config from '../../../../../../config'
import BrokerContext from '../../../../../../contexts/BrokerContext'
import ApiService from '../../../../../../services/api-service'

class Messages extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            messages: [],
            messagetypes: []
        }
    }

    setMessages = (messages) => {
        this.setState({
            messages
        })
    }

    setMessageTypes = (messagetypes) => {
        this.setState({
            messagetypes
        })
    }


    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setMessages(data.data.messages)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/commtypes`)
            .then(data => {
                this.setMessageTypes(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    addMessage = (e) => {
        e.preventDefault()
        const newMessage = {
            assetcomment: {
                assetcomment: e.target.description.value,
                commtype_id: e.target.comm_type.value,
                alert: true
            }
        }

        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/assetcomments`
        ApiService.postDataHalf(endpoint, newMessage)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setMessages(data)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    
        e.target.description.value = ""
        e.target.comm_type.value = ""
    }

    deleteMessage = (id) => {
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/assetcomments`
        ApiService.deleteDataHalf(endpoint, id)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setMessages(data)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    toggleForm = () => {
        const form = document.getElementById('message-form')
        form.classList.toggle('hidden')
        const btn = document.getElementById('me-btn')
        if(form.className === 'sp-form hidden'){
            btn.innerHTML = '+'
        } else {
            btn.innerHTML = '-'
        }
    }


    render() {
        return (
            <div>
                <div className='header-grid'>
                    <h2>Messages</h2>
                    <button className='add' id="me-btn" onClick={this.toggleForm}>+</button>
                </div>
                <form className="sp-form hidden" id="message-form" onSubmit={(e) => {this.addMessage(e)}}>
                    <div className="form-group">
                        <label htmlFor="comm_type">Comment Type: </label>
                        <select name="comm_type">
                            <option value="">Select a Type</option>
                            {this.state.messagetypes.map(c => {
                                return (
                                <option key={c.id} value={c.id}>{c.commdesc}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <input type="text" name="description"></input>
                    </div>
                    <input type="submit" className="submit" value="Add Message"></input>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.messages.map(f => {
                            return (
                                <tr key={f.id}>
                                    <td>{f.type}</td>
                                    <td>{f.description}</td>
                                    <td><button onClick={() => {this.deleteMessage(f.id)}}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                
            </div>
        )
    }
}

export default Messages