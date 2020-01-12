import React, { Component } from 'react'
import config from '../../../config'
import BrokerContext from '../../../contexts/BrokerContext'
import ApiService from '../../../services/api-service'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ImageUploader from 'react-images-upload'
import CloseIcon from '@material-ui/icons/Close';
 
class Maintenance extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            maintenance: [],
            mainttypes: [],
            providers: [],
            files: []
        }
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
    }

    fileSelectedHandler = (e) => {
        console.log(e)
        this.setState({
            files: e
        })
    }

    setMaintenance = (maintenance) => {
        this.setState({
            maintenance
        })
    }

    setMaintTypes = (mainttypes) => {
        this.setState({
            mainttypes
        })
    }

    setProviders = (providers) => {
        this.setState({
            providers
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/maintenances`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setMaintenance(data.maintenances)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/mainttypes`)
            .then(data => {
                this.setMaintTypes(data)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/providers`)
            .then(data => {
                this.setProviders(data.providers)
            })
            .catch(error => {
                console.log(error)
            })
    }

    addMaintenance = (e) => {
        e.preventDefault()

        let formData = new FormData()

        formData.append('maintenance[informto]', e.target.description.value)
        formData.append('maintenance[initialcost]', e.target.initial_cost.value)
        formData.append('maintenance[finalcost]', e.target.final_cost.value)
        formData.append('maintenance[maintcomm]', e.target.comment.value)
        formData.append('maintenance[plandate]', e.target.plan_date.value)
        formData.append('maintenance[deliverdate]', e.target.deliver_date.value)
        formData.append('maintenance[provider_id]', e.target.provider.value)
        formData.append('maintenance[mainttype_id]', e.target.maint_type.value)
        formData.append('maintenance[receipts][]', this.state.files[0])

        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/maintenances`

        fetch(endpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${config.API_KEY}`
            }
            })
            .then(res => {
                if(!res.ok)
                    return res.json().then(error => Promise.reject(error))
                return res.json()
            })
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setMaintenance(data.maintenances)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteMaintenance = (id) => {
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/maintenances`
        ApiService.deleteDataHalf(endpoint, id)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setMaintenance(data.maintenances)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    toggleForm = () => {
        const form = document.getElementById('maintenance-form')
        form.classList.toggle('hidden')
        const btn = document.getElementById('m-btn')
        if(form.className === 'sp-form hidden'){
            btn.innerHTML = '+'
        } else {
            btn.innerHTML = '-'
        }
    }


    render() {
        const files = this.state.files
        return (
            <div>
                <div className='header-grid-component'>
                    <button className='add' id="m-btn" onClick={this.toggleForm}>+</button>
                </div>
                <form className="sp-form hidden" id="maintenance-form" onSubmit={(e) => {this.addMaintenance(e)}}>
                <div className="form-group">
                        <label htmlFor="images"><h3>Upload Reciept</h3></label>
                        <div>
                            <ImageUploader
                                withIcon={true}
                                buttonText='Upload Reciept'
                                onChange={(e) => this.fileSelectedHandler(e)}
                                imgExtension={['.pdf']}
                                accept="application/pdf"
                                maxFileSize={5242880}
                                name="file"
                                className="image-uploader"
                                label="Max file size: 5mb | accepted: pdf"
                            />
                            <div className="images-container">
                            {(files) 
                            ? files.map((file, i) => {
                                return (
                                    <div 
                                        key={i}
                                        className="thumbnail-container"
                                    >
                                        <CloseIcon 
                                            onClick={() => this.props.removeImage(file, i)}
                                            className="close-image"
                                            fontSize="small"
                                        />
                                        <img 
                                            width={100}
                                            src={file.id ? file.url : URL.createObjectURL(file)} 
                                            alt={file.name}
                                        />
                                        <p>{file.name}</p>
                                    </div>
                                    )
                                })
                            : null
                            }
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="maint_type">Maintenance Type: </label>
                        <select name="maint_type">
                            <option value="">Select a Type</option>
                            {this.state.mainttypes.map(m => {
                                return (
                                <option key={m.id} value={m.id}>{m.maindescr}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="provider">Maintenance Provider: </label>
                        <select name="provider">
                            <option value="">Select a Type</option>
                            {this.state.providers.map(m => {
                                return (
                                <option key={m.data.id} value={m.data.id}>{m.data.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <input type="text" name="description"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Comment: </label>
                        <input type="text" name="comment"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="initial_cost">Initial Cost: </label>
                        <input type="number" name="initial_cost"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="final_cost">Final Cost: </label>
                        <input type="number" name="final_cost"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="plan_date">Plan Date: </label>
                        <input type="date" name="plan_date"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="deliver_date">Deliver Date: </label>
                        <input type="date" name="deliver_date"></input>
                    </div>
                    <input type="submit" className="submit" value="Add Maintenance"></input>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Cost</th>
                            <th>Provider</th>
                            <th>Request Date</th>
                            <th>Deliver Date</th>
                            <th>Reciept</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.maintenance.map(f => {
                            const receiptUrl = f.data.receipt_url[0]
                            let url;
                            if(receiptUrl){
                                url = receiptUrl.receipt
                            }
                            return (
                                <tr key={f.data.id}>
                                    <td>{f.data.informto}</td>
                                    <td>${f.data.initialcost}</td>
                                    <td>
                                        {(this.state.providers).map(p => {
                                            if(p.data.id === f.data.provider_id){
                                                return p.data.name
                                            }
                                            else {
                                                return null
                                            }
                                        })}
                                    </td>
                                    <td>{f.data.reqdate}</td>
                                    <td>{(f.data.deliverdate) ? `Completed ${f.data.deliverdate}` : 'Pending' }</td>
                                    <td>
                                        {(url ? <a href={`${url}`} target="_blank" rel="noopener noreferrer">View</a> : null)}
                                    </td>
                                    <td className="delete">
                                        <button className="delete-btn" onClick={() => this.deleteMaintenance(f.data.id)}>
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

export default Maintenance