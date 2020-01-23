import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../config'
import ApiService from '../../../services/api-service'
import BrokerContext from '../../../contexts/BrokerContext'
import CloseIcon from '@material-ui/icons/Close';
import CheckInForm from '../Forms/CheckInForm'
import CheckOutForm from '../Forms/CheckOutForm'
import { PDFDownloadLink } from "@react-pdf/renderer";
import ImageUploader from 'react-images-upload'

class CheckIn extends Component {
    static contextType = BrokerContext

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            asset: [],
            user: [],
            features: [],
            checkin: [],
            checkout: [],
            closing: []
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

    checkinSelectedHandler = (file) => {
        this.setState({
            checkin: [...file]
        })
    }

    checkoutSelectedHandler = (file) => {
        this.setState({
            checkout: [...file]
        })
    }

    closingSelectedHandler = (file) => {
        this.setState({
            closing: [...file]
        })
    }

    removeCheckinImage = (name, index) => {
        let newPics = this.state.checkin
        newPics.splice(index, 1);
        this.setState({
            checkin: [...newPics]
        })
    }

    removeCheckoutImage = (name, index) => {
        let newPics = this.state.checkout
        newPics.splice(index, 1);
        this.setState({
            checkout: [...newPics]
        })
    }

    removeClosingImage = (name, index) => {
        let newPics = this.state.closing
        newPics.splice(index, 1);
        this.setState({
            closing: [...newPics]
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

        formData.append('checkin', this.state.checkin[0])

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
                this.props.history.history.push(`/${this.props.usertype}/properties/${this.props.id}`)
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
            })
    }

    editCheckout = (e) => {
        e.preventDefault()
        this.setState({ loading: true })
        const formData = new FormData();

        formData.append('checkout', this.state.checkout[0])

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
                this.props.history.history.push(`/${this.props.usertype}/properties/${this.props.id}`)
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
            })
    }

    uploadClosing = (e) => {
        e.preventDefault()
        this.setState({ loading: true })
        const formData = new FormData();

        formData.append('closing', this.state.closing[0])

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
                this.props.history.history.push(`/${this.props.usertype}/properties/${this.props.id}`)
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
            })
    }

    render(){
        return (
            <div className='add-property checkout'>
                <div className='header-grid'>
                    <h2>Property Documents</h2>
                    <Link className="close-icon" to={`/${this.props.usertype}/properties/${this.props.id}`}>
                        <CloseIcon 
                            className="action-icon" 
                        />
                    </Link>
                </div>
                <div>
                    <h3>Checkin Form</h3>
                    <p>Download and sign checkin form and upload it to the portal.</p>
                    {(!this.state.asset.checkin_url)
                    ? (this.state.asset.assetdesc && this.state.user.email && this.state.features[0]) && <><PDFDownloadLink
                        document={
                            <CheckInForm
                                asset={this.state.asset}
                                user={this.state.user}
                                features={this.state.features}
                            />
                        }
                        fileName="checkin.pdf"
                        className="submit"
                        >
                        Download PDF
                    </PDFDownloadLink>
                    <form onSubmit={(e) => this.editCheckin(e)}>
                        <div className="form-group">
                            <div>
                            <ImageUploader
                                withIcon={true}
                                buttonText='Add Checkin Form'
                                onChange={(e) => this.checkinSelectedHandler(e)}
                                imgExtension={['.pdf']}
                                accept="application/pdf"
                                maxFileSize={5242880}
                                className="image-uploader"
                                name="contract"
                                label="Max file size: 5mb | accepted: pdf"
                            />
                                <div className="images-container">
                                {(this.state.checkin) 
                                ? this.state.checkin.map((file, i) => {
                                    return (
                                        <div 
                                            key={i}
                                            className="thumbnail-container"
                                        >
                                            <CloseIcon 
                                                onClick={() => this.removeCheckinImage(file, i)}
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
                        <input type="submit" className="submit" value="Upload" />
                    </form>
                    </>
                 : <a href={this.state.asset.checkin_url} target="_blank" rel="noopener noreferrer" className="submit">View Checkin Form</a>}
                </div>
                <div>
                    <h3>Checkout Form</h3>
                    <p>Download and sign checkout form and upload it to the portal.</p>
                    {(!this.state.asset.checkout_url)
                    ? (this.state.asset.assetdesc && this.state.user.email && this.state.features[0]) && <><PDFDownloadLink
                        document={
                            <CheckOutForm
                                asset={this.state.asset}
                                user={this.state.user}
                                features={this.state.features}
                            />
                        }
                        fileName="checkout.pdf"
                        className="submit"
                        >
                        Download PDF
                    </PDFDownloadLink>
                    <form onSubmit={(e) => this.editCheckout(e)}>
                        <div className="form-group">
                            <div>
                            <ImageUploader
                                withIcon={true}
                                buttonText='Add Checkout Form'
                                onChange={(e) => this.checkoutSelectedHandler(e)}
                                imgExtension={['.pdf']}
                                accept="application/pdf"
                                maxFileSize={5242880}
                                className="image-uploader"
                                name="contract"
                                label="Max file size: 5mb | accepted: pdf"
                            />
                                <div className="images-container">
                                {(this.state.checkout) 
                                ? this.state.checkout.map((file, i) => {
                                    return (
                                        <div 
                                            key={i}
                                            className="thumbnail-container"
                                        >
                                            <CloseIcon 
                                                onClick={() => this.removeCheckoutImage(file, i)}
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
                        <input type="submit" className="submit" value="Upload" />
                    </form>
                    </>
                 : <a href={this.state.asset.checkout_url} target="_blank" rel="noopener noreferrer" className="submit">View Checkout Form</a>}
                </div>
                <div>
                    <h3>Closing Form</h3>
                    <p>Download and sign closing form and upload it to the portal.</p>
                    {(!this.state.asset.closing_url)
                    ? <form onSubmit={(e) => this.uploadClosing(e)}>
                        <div className="form-group">
                            <div>
                            <ImageUploader
                                withIcon={true}
                                buttonText='Add Closing Form'
                                onChange={(e) => this.closingSelectedHandler(e)}
                                imgExtension={['.pdf']}
                                accept="application/pdf"
                                maxFileSize={5242880}
                                className="image-uploader"
                                name="contract"
                                label="Max file size: 5mb | accepted: pdf"
                            />
                                <div className="images-container">
                                {(this.state.closing) 
                                ? this.state.closing.map((file, i) => {
                                    return (
                                        <div 
                                            key={i}
                                            className="thumbnail-container"
                                        >
                                            <CloseIcon 
                                                onClick={() => this.removeClosingImage(file, i)}
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
                        <input type="submit" className="submit" value="Upload" />
                    </form>
                 : <a href={this.state.asset.checkout_url} target="_blank" rel="noopener noreferrer" className="submit">View Closing Form</a>}
                </div>
            </div>
        )
    }
}

export default CheckIn