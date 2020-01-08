import React, { Component } from 'react'
import config from '../../../config'
import BrokerContext from '../../../contexts/BrokerContext'
import ApiService from '../../../services/api-service'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ImageUploader from 'react-images-upload'
import CloseIcon from '@material-ui/icons/Close';

class Cost extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            costs: [],
            files: []
        }
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
        this.addCost = this.addCost.bind(this)
    }

    setCosts = (costs) => {
        this.setState({
            costs
        })
    }

    fileSelectedHandler = (file) => {
        this.setState({
            files: [...file]
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
        const newCost = {
            cost: {
                concept: e.target.description.value,
                date: e.target.year.value,
                amount: e.target.annualamount.value,
                kind: e.target.kind.value,
                reciepts: [...this.state.files]
            }
        }
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/costs`
        ApiService.postDataHalf(endpoint, newCost)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setCosts(data.costs)
                    })
            })
            .catch(error => {
                console.log(error)
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
            <div className='header-grid'>
                    <h3>Costs</h3>
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
                                name="image"
                                className="image-uploader"
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
                    <input type="submit" className="submit" value="Add Cost"></input>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Year</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.costs.map(f => {
                            return (
                                <tr key={f.data.id}>
                                    <td>{f.data.kind}</td>
                                    <td>{f.data.concept}</td>
                                    <td>${f.data.amount}</td>
                                    <td>{f.data.date}</td> 
                                    <td className="delete">
                                        <button className="delete-btn" onClick={() => {this.deleteCost(f.data.id)}}>
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

export default Cost
