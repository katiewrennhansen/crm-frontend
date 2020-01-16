import React, { Component } from 'react'
import config from '../../../config'
import BrokerContext from '../../../contexts/BrokerContext'
import ApiService from '../../../services/api-service'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ImageUploader from 'react-images-upload'
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

class Cost extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            costs: [],
            files: [],
            loading: false
        }
        this.addCost = this.addCost.bind(this)
    }

    setCosts = (costs) => {
        this.setState({
            costs
        })
    }

    fileSelectedHandler = (e) => {
        console.log(e)
        this.setState({
            files: e
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/costs`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setCosts(data.costs)
            })
            .catch(error => {
                console.log(error)
            })
    } 

    addCost = (e) => {
        e.preventDefault()
        this.setState({ loading: true })

        let formData = new FormData()

        formData.append('cost[concept]', e.target.description.value)
        formData.append('cost[date]', e.target.year.value)
        formData.append('cost[amount]', e.target.annualamount.value)
        formData.append('cost[kind]', e.target.kind.value)
        formData.append('cost[receipts][]', this.state.files[0])

        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/costs`

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
                        this.setCosts(data.costs)
                        this.toggleForm()
                    })
            })
            .catch(error => {
                this.setState({ 
                    error: error.error,
                    loading: false 
                })
            })
        e.target.description.value = ""
        e.target.year.value = ""
        e.target.annualamount.value = ""
        e.target.kind.value = ""
    }

    deleteCost = (id) => {
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/costs`
        ApiService.deleteDataHalf(endpoint, id)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setCosts(data.costs)
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
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <input type="text" name="description"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year: </label>
                        <input type="date" name="year"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="annualamount">Annual Amount: </label>
                        <input type="number" name="annualamount"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="kind">Kind: </label>
                        <input type="text" name="kind"></input>
                    </div>
                    {(this.state.loading)
                        ? <div className="loading-property">
                            <CircularProgress />
                        </div>
                        : (
                        <input type="submit" className="submit" value="Add Cost"></input>
                        )
                    }
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Year</th>
                            <th>Reciept</th>
                            <th className="delete-heading">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.costs[0])
                        ? this.state.costs.map(f => {
                            const receiptUrl = f.data.receipt_url[0]
                            let url;
                            if(receiptUrl){
                                url = receiptUrl.receipt
                            }
                            return (
                                <tr key={f.data.id}>
                                    <td>{f.data.kind}</td>
                                    <td>{f.data.concept}</td>
                                    <td>${f.data.amount}</td>
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
                            <td className='nothing-to-display'>No costs to display</td>
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
