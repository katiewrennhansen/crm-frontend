import React, { Component } from 'react'
import ApiService from '../../../services/api-service'
import config from '../../../config'
import BrokerContext from '../../../contexts/BrokerContext'
import ImageUploader from 'react-images-upload'
import CloseIcon from '@material-ui/icons/Close';


class PropertyForm extends Component {
    static contextType = BrokerContext

    constructor(props) {
        super(props)
        this.state = {
            brokers: [],
            process: [],
            steps: [],
            categories: [],
            status: [],
            assets: [],
            customers: [],
            pictures: []
        }
    }

    setBrokers = (brokers) => {
        this.setState({
            brokers
        })
    }

    setProcess = (process) => {
        this.setState({
            process
        })
    }

    setSteps = (steps) => {
        this.setState({
            steps
        })
    }

    setCategories = (categories) => {
        this.setState({
            categories
        })
    }

    setStatus = (status) => {
        this.setState({
            status
        })
    }

    setAssetType = (assets) => {
        this.setState({
            assets
        })
    }

    setCustomers = (customers) => {
        this.setState({
            customers
        })
    }

    componentDidMount(){
        if(this.props.id){
            ApiService.getDataHalf(`${config.API_ENDPOINT}/assets/${this.props.id}`)
                .then(data => {
                    this.context.setSingleAsset(data.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        ApiService.getDataHalf(`${config.API_ENDPOINT}/brokers`)
            .then(data => {
                this.setBrokers(data.brokers)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/processts`)
            .then(data => {
                this.setProcess(data.processts)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/categories`)
            .then(data => {
                this.setCategories(data)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/statuses`)
            .then(data => {
                this.setStatus(data)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/assettypes`)
            .then(data => {
                this.setAssetType(data)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/customers`)
            .then(data => {
                this.setCustomers(data.customers)
            })
            .catch(error => {
                console.log(error)
            })
    }

    getSteps = (e) => {
        const id = e.target.value
        ApiService.getDataHalf(`${config.API_ENDPOINT}/processts/${id}/steps`)
            .then(data => {
                this.setSteps(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        const asset = this.props.asset
        const files = this.props.files
        return (
            <form className="add-property-form" onSubmit={(e) => {this.props.handleSubmit(e)}}>
                <div className="inner-form-content">
                <p>Please fill out all forms marked with an <span className="required">*</span></p>
                <div className="form-content-section">
                    <h3>Upload Images</h3>
                        <div className="form-group">
                            <div>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Choose Images'
                                    onChange={(e) => this.props.onChange(e)}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
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
                                                onClick={() => this.props.removeImage(file, i)}
                                                className="close-image"
                                                fontSize="small"
                                            />
                                            <img 
                                                width={100}
                                                src={file.id ? file.url : URL.createObjectURL(file)} 
                                                alt="thumbnail"
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
                    </div>
                    <div className="form-content-section">
                        <h3>Address</h3>
                        <div className="form-group">
                            <label htmlFor="street_name">Street Name<span className="required">*</span></label>
                            <input type="text" name="street_name" defaultValue={asset.adescription4}></input>
                        </div>
                        <div className="form-group row">
                            <div>
                                <label htmlFor="city">City<span className="required">*</span></label>
                                <input type="text" name="city" defaultValue={asset.adescription5}></input>
                            </div>
                            <div>
                                <label htmlFor="state">State<span className="required">*</span></label>
                                <input type="text" name="state" defaultValue={asset.adescription2}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div>
                                <label htmlFor="zip_code">Zip Code<span className="required">*</span></label>
                                <input type="text" name="zip_code" defaultValue={asset.adescription3}></input>
                            </div>
                            <div>
                                <label htmlFor="country">Country<span className="required">*</span></label>
                                <input type="text" name="country"defaultValue={asset.adescription1}></input>
                            </div>
                        </div>
                    </div>

                    <div className="form-content-section">
                        <h3>Asset Information</h3>
                        <div className="form-group">
                            <label htmlFor="description">Description<span className="required">*</span></label>
                            <textarea name="description" rows="5" defaultValue={asset.assetdesc} placeholder="Describe your property..."></textarea>
                        </div>
                        <div className="form-group row">
                            <div>
                                <label htmlFor="price">Price<span className="required">*</span></label>
                                <input type="number" name="price" defaultValue={asset.assetprice}></input>
                            </div>
                            <div>
                                <label htmlFor="future_price">Future Price<span className="required">*</span></label>
                                <input type="number" name="future_price" defaultValue={asset.futureprice}></input>
                            </div>
                        </div>
                        
                        <div className="form-group col3">
                            <div>
                                <label htmlFor="status">Status<span className="required">*</span></label>
                                <select name="status">
                                    <option value="">Select a Status</option>
                                    {this.state.status.map(s => {
                                        if(asset.status === s.statusdesc){
                                            return (
                                                <option key={s.id} value={s.id} selected>{s.statusdesc}</option>
                                            )
                                        }
                                        return (
                                        <option key={s.id} value={s.id}>{s.statusdesc}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="asset_type">Asset Type<span className="required">*</span></label>
                                <select name="asset_type">
                                    <option value="">Select an Asset Type</option>
                                    {this.state.assets.map(a => {
                                        if(asset.assettype === a.assettdesc){
                                            return (
                                                <option key={a.id} value={a.id} selected>{a.assettdesc}</option>
                                            )
                                        }
                                        return (
                                        <option key={a.id} value={a.id}>{a.assettdesc}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        
                        {(this.state.customers[0]) 
                            ? (
                            <div className="form-group col3">
                                <div>
                                    <label htmlFor="owner">Owner<span className="required">*</span></label>
                                    <select name="owner">
                                        <option value="">Select an Owner</option>
                                        {this.state.customers.map(c => {
                                            if(asset.owner === c.data.name){
                                                return (
                                                    <option key={c.data.id} value={c.data.id} selected>{c.data.name}</option>
                                                )
                                            }
                                            return (
                                            <option key={c.data.id} value={c.data.id}>{c.data.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="tenant">Tenant<span className="required">*</span></label>
                                    <select name="tenant">
                                        <option value="">Select a Tenant</option>
                                        {this.state.customers.map(c => {
                                            if(asset.tenant === c.data.name){
                                                return (
                                                    <option key={c.data.id} value={c.data.id} selected>{c.data.name}</option>
                                                )
                                            }
                                            return (
                                            <option key={c.data.id} value={c.data.id}>{c.data.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="brokers">Broker<span className="required">*</span></label>
                                    <select name="brokers">
                                        <option value="">Select a Broker</option>
                                        {this.state.brokers.map(b => {
                                            if(asset.broker === b.data.name){
                                                return (
                                                    <option key={b.data.id} value={b.data.id} selected>{b.data.name}</option>
                                                )
                                            }
                                            return (
                                            <option key={b.data.id} value={b.data.id}>{b.data.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>  
                            )
                            : null
                        }
                        
                        <div className="form-group col3">
                            <div>
                                <label htmlFor="process">Process<span className="required">*</span></label>
                                <select name="process" onChange={(e) => {this.getSteps(e)}} >
                                    <option value="">Select a Process</option>
                                    {this.state.process.map(p => {
                                        if(asset.processt === p.data.processdesc){
                                            return (
                                                <option key={p.data.id} value={p.data.id} selected>{p.data.processdesc}</option>
                                            )
                                        }
                                        return (
                                        <option key={p.data.id} value={p.data.id}>{p.data.processdesc}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="steps">Steps<span className="required">*</span></label>
                                <select name="steps">
                                    <option value="">Select a Step</option>
                                    {this.state.steps.map(s => {
                                        return (
                                        <option key={s.id} value={s.id}>{s.stepdesc}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="step_date">Step Date<span className="required">*</span></label>
                                <input type="date" name="step_date" defaultValue={asset.stepdate}></input>
                            </div>
                        </div>
                    </div>

                    <div className="form-content-section">
                        <h3>Insurance Information</h3>
                        <div className="form-group">
                            <label htmlFor="insurance">Insurance Provider<span className="required">*</span></label>
                            <input type="text" name="insurance" defaultValue={asset.assetinsurance}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="insurance_due">Insurance Due<span className="required">*</span></label>
                            <input type="date" name="insurance_due"defaultValue={asset.insurancedued}></input>
                        </div>
                    </div>
                    
                    <input type="submit" className="submit" value={this.props.button}></input>
                </div>
            </form>
        )
    }
}

export default PropertyForm