import React, { Component } from 'react'
import config from '../../../config'
import BrokerContext from '../../../contexts/BrokerContext'
import ApiService from '../../../services/api-service'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CircularProgress from '@material-ui/core/CircularProgress';


class Messages extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            messages: [],
            messagetypes: [],
            loading: false
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
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/assetcomments`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setMessages(data.assetcomments)
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

        this.setState({ loading: true })

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
                        this.setMessages(data.assetcomments)
                        this.toggleForm()
                    })
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
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
                        this.setMessages(data.assetcomments)
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
                <div className='header-grid-component'>
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
                    {(this.state.loading)
                        ? <div className="loading-property">
                            <CircularProgress />
                        </div>
                        : (
                        <input type="submit" className="submit" value="Add Message"></input>
                        )
                    }                </form>
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
                                <tr key={f.data.id}>
                                    <td>
                                        {this.state.messagetypes.map(p => {
                                            if(p.id === f.data.commtype_id){
                                                return p.commdesc
                                            }
                                            else {
                                                return null
                                            }
                                        })}
                                    </td>
                                    <td>{f.data.assetcomment}</td>
                                    <td className="delete">
                                        <button className="delete-btn" onClick={() => {this.deleteMessage(f.data.id)}}>
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

export default Messages