import React, { Component } from 'react'
import config from '../../../config'
import BrokerContext from '../../../contexts/BrokerContext'
import ApiService from '../../../services/api-service'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ImageUploader from 'react-images-upload'
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import TokenService from '../../../services/token-service';

class Cost extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            costs: [],
            files: [],
            concepts: [],
            loading: false
        }
        this.addCost = this.addCost.bind(this)
    }

    setCosts = (costs) => {
        this.setState({
            costs
        })
    }

    setTransConcepts = concepts => {
        this.setState({
            concepts
        })
    }

    fileSelectedHandler = (e) => {
        this.setState({
            files: e
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/transactions`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setCosts(data.transactions)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/transconcepts`)
            .then(data => {
                this.setTransConcepts(data)
            })
            .catch(error => {
                console.log(error)
            })
    } 

    addCost = (e) => {
        e.preventDefault()
        this.setState({ loading: true })

        let formData = new FormData()

        formData.append('transaction[transconcept_id]', e.target.transconcept_id.value)
        formData.append('transaction[date]', e.target.date.value)
        formData.append('transaction[amount]', e.target.amount.value)
        formData.append('transaction[kind]', e.target.kind.value)
        formData.append('transaction[comment]', e.target.comment.value)
        formData.append('transaction[receipts][]', this.state.files[0])

        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/transactions`
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
                        this.setCosts(data.transactions)
                        this.toggleForm()
                        this.setState({ loading: false })
                    })
            })
            .catch(error => {
                this.setState({ 
                    error: error.error,
                    loading: false 
                })
            })
        e.target.comment.value = ""
        e.target.date.value = ""
        e.target.amount.value = ""
        e.target.kind.value = ""
        e.target.transconcept_id.value = ""
    }

    deleteCost = (id) => {
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/transactions`
        ApiService.deleteDataHalf(endpoint, id)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setCosts(data.transactions)
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

    removeImage = (file, index) => {
        let newPics = this.state.files
        newPics.splice(index, 1);
        this.setState({
            files: [...newPics]
        })
    }

    render() {
        const files = this.state.files
        return (
            <div>
            <div className='header-grid-component'>
                    <button id="c-btn" className="add" onClick={this.toggleForm}>+</button>
                </div>
                <form className="sp-form hidden" id="costs-form" onSubmit={(e) => {this.addCost(e)}}>
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
                                className="image-uploader"
                                name="file"
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
                                            onClick={() => this.removeImage(file, i)}
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
                            <label htmlFor="transconcept_id">Type<span className="required">*</span></label>
                            <select name="transconcept_id">
                                <option value="">Select a Transaction Type</option>
                                {this.state.concepts.map(s => 
                                    <option key={s.id} value={s.id}>{s.concept}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="kind">Kind<span className="required">*</span></label>
                            <select name="kind">
                                <option value="">Select a Transaction Type</option>
                                <option value="income">Income</option>
                                <option value="outcome">Outcome</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-group row">
                        <div>
                            <label htmlFor="date">Date<span className="required">*</span></label>
                            <input type="date" name="date"></input>
                        </div>
                        <div>
                            <label htmlFor="amount">Amount<span className="required">*</span></label>
                            <input type="number" name="amount"></input>
                        </div>
                    </div>
        
                    <div className="form-group">
                        <label htmlFor="comment">Comment<span className="required">*</span></label>
                        <input type="text" name="comment"></input>
                    </div>
                    
                    {(this.state.loading)
                        ? <div className="loading-property">
                            <CircularProgress />
                          </div>
                        : <input type="submit" className="submit" value="Add Cost"></input>
                    }
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Kind</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Reciept</th>
                            <th className="delete-heading">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.costs[0])
                        ? this.state.costs.map(f => {
                            let url
                            if(f.data.receipt_url){
                                url = f.data.receipt_url[0].receipt
                            }
                            return (
                                <tr key={f.data.id}>
                                    <td>{f.data.concept}</td>
                                    <td>{f.data.kind}</td>
                                    <td>{f.data.amount}</td>
                                    <td>{f.data.date}</td> 
                                    <td>
                                    {(url 
                                        ? <a href={`${url}`} className="close-icon" target="_blank" rel="noopener noreferrer">
                                            <InsertDriveFileIcon />
                                        </a> 
                                        : null)
                                        }
                                    </td>
                                    <td className="delete">
                                            <DeleteOutlineIcon 
                                                className="delete-btn" 
                                                onClick={() => this.deleteCost(f.data.id)}
                                            />
                                    </td>
                                </tr>
                            ) 
                        })
                        :
                        <tr>
                            <td className='nothing-to-display'>No transactions to display</td>
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

export default Cost
