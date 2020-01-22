import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../config'
import ApiService from '../../../services/api-service'
import BrokerContext from '../../../contexts/BrokerContext'
import CloseIcon from '@material-ui/icons/Close';
import CheckInForm from '../Forms/CheckInForm'
import { PDFDownloadLink } from "@react-pdf/renderer";
import ImageUploader from 'react-images-upload'

class CheckIn extends Component {
    static contextType = BrokerContext

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            asset: [],
            signature: '',
            date: '',
            user: [],
            features: [],
            files: []
        }
    }

    setAsset = asset => {
        this.setState({
            asset
        })
    }

    setUser = user => {
        this.setState({
            user
        })
    }

    setFeatures = features => {
        this.setState({
            features
        })
    }

    fileSelectedHandler = (file) => {
        this.setState({
            files: [...file]
        })
    }

    removeImage = (file, index) => {
        let newPics = this.state.files
        newPics.splice(index, 1);
        this.setState({
            files: [...newPics]
        })
    }

    componentDidMount(){
        ApiService.getDataHalf(`${config.API_ENDPOINT}/assets/${this.props.id}`)
            .then(data => {
                this.setAsset(data.data)
                ApiService.getDataHalf(`${config.API_ENDPOINT}/users/${data.data.user_id}`)
                    .then(user => {
                        this.setUser(user.data)
                    })
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/assets/${this.props.id}/features`)
            .then(data => {
                this.setFeatures(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    editCheckin = (e) => {
        e.preventDefault()
        this.setState({ loading: true })
        const formData = new FormData();

        formData.append('checkin', this.state.files[0])

        fetch(`${config.API_ENDPOINT}/assets/${this.props.id}`, {
            method: 'PATCH',
            body: formData,
            headers: {
                'Authorization': `Bearer ${config.API_KEY}`
            }
            })
            .then(res => {
                if(!res.ok)
                    return res.json().then(error => Promise.reject(error))
                return res
            })
            .then(data => {
                this.props.history.history.push(`/broker/properties/${this.props.id}`)
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
            })
    }

    render(){
        return (
            <div className='add-property'>
                <div className='header-grid'>
                    <h2>Check In Form</h2>
                    <Link className="close-icon" to='/broker/properties'>
                        <CloseIcon 
                            className="action-icon" 
                        />
                    </Link>
                </div>
                <div>
                    <p>Download and sign checkin form and upload it to the portal.</p>
                    {(this.state.asset.assetdesc && this.state.user.email && this.state.features[0]) && <PDFDownloadLink
                        document={
                            <CheckInForm
                                asset={this.state.asset}
                                user={this.state.user}
                                features={this.state.features}
                            />
                        }
                        fileName="checkin.pdf"
                        className="contract-link submit"
                        >
                        Download PDF
                    </PDFDownloadLink>}
                </div>
                <form onSubmit={(e) => this.editCheckin(e)}>
                    <div className="form-group">
                        <div>
                        <ImageUploader
                            withIcon={true}
                            buttonText='Add Checkin Form'
                            onChange={(e) => this.fileSelectedHandler(e)}
                            imgExtension={['.pdf']}
                            accept="application/pdf"
                            maxFileSize={5242880}
                            className="image-uploader"
                            name="contract"
                            label="Max file size: 5mb | accepted: pdf"
                        />
                            <div className="images-container">
                            {(this.state.files) 
                            ? this.state.files.map((file, i) => {
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
                                            alt="contract"
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
                    <input type="submit" class="submit" value="Upload" />
                 </form>
            </div>
        )
    }
}

export default CheckIn