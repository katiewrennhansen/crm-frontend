import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../config'
import BrokerContext from '../../../contexts/BrokerContext'
import ApiService from '../../../services/api-service'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ImageUploader from 'react-images-upload'
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import PageviewIcon from '@material-ui/icons/Pageview';
import TokenService from '../../../services/token-service'
 
class Maintenance extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            maintenance: [],
            mainttypes: [],
            providers: [],
            files: [],
            loading: false
        }
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
    }

    fileSelectedHandler = e => {
        console.log(e)
        this.setState({
            files: e
        })
    }

    setMaintenance = maintenance => {
        this.setState({
            maintenance
        })
    }

    setMaintTypes = mainttypes => {
        this.setState({
            mainttypes
        })
    }

    setProviders = providers => {
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

        this.setState({ loading: true })

        let formData = new FormData()

        formData.append('maintenance[informto]', e.target.description.value)
        // formData.append('maintenance[initialcost]', e.target.initial_cost.value)
        // formData.append('maintenance[finalcost]', e.target.final_cost.value)
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
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
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
                        this.toggleForm()
                    })
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
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
                    <div className="form-group row">
                        <div>
                            <label htmlFor="maint_type">Maintenance Type: </label>
                            <select name="maint_type">
                                <option value="">Select a Type</option>
                                {this.state.mainttypes.map(m => 
                                    <option key={m.id} value={m.id}>{m.maindescr}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="provider">Maintenance Provider: </label>
                            <select name="provider">
                                <option value="">Select a Type</option>
                                {this.state.providers.map(m => 
                                    <option key={m.data.id} value={m.data.id}>{m.data.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-group row">
                        <div>
                            <label htmlFor="description">Description: </label>
                            <input type="text" name="description"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="comment">Comment: </label>
                            <input type="text" name="comment"></input>
                        </div>
                    </div>
                    
                    <div className="form-group row">
                        {/* <div> No requiere Backend is calculating
                            <label htmlFor="initial_cost">Initial Cost: </label>
                            <input type="text" name="initial_cost"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="final_cost">Final Cost: </label>
                            <input type="text" name="final_cost"></input>
                        </div> */}
                    </div>
                    
                    <div className="form-group row">
                        <div>
                            <label htmlFor="plan_date">Plan Date: </label>
                            <input type="date" name="plan_date"></input>
                        </div>
                        <div>
                            <label htmlFor="deliver_date">Deliver Date: </label>
                            <input type="date" name="deliver_date"></input>
                        </div>
                        
                    </div>
                    
                    {(this.state.loading)
                        ? <div className="loading-property">
                            <CircularProgress />
                        </div>
                        : (
                        <input type="submit" className="submit" value="Add Maintenance"></input>
                        )
                    }                
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Cost</th>
                            <th>Provider</th>
                            <th>Request Date</th>
                            <th>Deliver Date</th>
                            <th>View Details</th>
                            <th className="delete-heading">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.maintenance[0])
                        ? this.state.maintenance.map(f => {
                            return (
                                <tr key={f.data.id}>
                                    <td>{f.data.status}</td>
                                    <td>{f.data.maintcomm}</td>
                                    <td>{(f.data.status === 'accepted') ? f.data.finalcost : f.data.initialcost}</td>
                                    <td>{f.data.provider}</td>
                                    <td>{f.data.reqdate}</td>
                                    <td>{f.data.deliverdate}</td>
                                    <td>
                                        <Link to={`/${this.props.type}/property/${this.props.id}/maintenance/${f.data.id}`}>
                                            <PageviewIcon className="active-icon"/>
                                        </Link>
                                    </td>
                                    <td className="delete">
                                            <DeleteOutlineIcon
                                                className="delete-btn" 
                                                onClick={() => this.deleteMaintenance(f.data.id)} 
                                            />
                                    </td>
                                </tr>
                            )
                        })
                        :
                        <tr>
                            <td className='nothing-to-display'>No maintenance records to display</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Maintenance