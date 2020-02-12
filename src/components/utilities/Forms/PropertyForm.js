import React, { Component } from 'react'
import ApiService from '../../../services/api-service'
import config from '../../../config'
import BrokerContext from '../../../contexts/BrokerContext'
import ImageUploader from 'react-images-upload'
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../portalpages/broker/brokerViews/Properties/Properties.css'


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
        console.log(this.props)
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

    getInitialSteps = () => {
        let id;
        if(this.props.asset.processt){
            this.state.process.map(p => {
                if(this.props.asset.processt === p.data.processdesc){
                    id = p.data.id
                    return id
                }
            })
            ApiService.getDataHalf(`${config.API_ENDPOINT}/processts/${id}/steps`)
                .then(data => {
                    this.setSteps(data)
                })
                .catch(error => console.log(error))
        }
    }

    render(){
        const asset = this.props.asset
        const files = this.props.files
        const contract = this.props.contract
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
                                    name="file"
                                    className="image-uploader"
                                    label="Max file size: 5mb | accepted: jpg, gif, png, jpeg"
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
                                <input type="text" name="price" defaultValue={asset.assetprice}></input>
                            </div>
                            <div>
                                <label htmlFor="future_price">Future Price<span className="required">*</span></label>
                                <input type="text" name="future_price" defaultValue={asset.futureprice}></input>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div>
                                <label htmlFor="assetrent">Rent<span className="required">*</span></label>
                                <input type="text" name="assetrent" defaultValue={asset.assetrent}></input>
                            </div>
                            <div>
                                <label htmlFor="futurerent">Future Rent<span className="required">*</span></label>
                                <input type="text" name="futurerent" defaultValue={asset.futurerent}></input>
                            </div>
                        </div>


                        <div className="form-group col3">
                            <div>
                                <label htmlFor="status">Status<span className="required">*</span></label>
                                <select name="status">
                                    <option value="">Select a Status</option>
                                    {this.state.status.map(s => 
                                        (asset.status === s.statusdesc)
                                            ?<option key={s.id} value={s.id} selected>{s.statusdesc}</option>
                                            : <option key={s.id} value={s.id}>{s.statusdesc}</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="asset_type">Asset Type<span className="required">*</span></label>
                                <select name="asset_type">
                                    <option value="">Select an Asset Type</option>
                                    {this.state.assets.map(a => 
                                        (asset.assettype === a.assettdesc)
                                            ? <option key={a.id} value={a.id} selected>{a.assettdesc}</option>
                                            : <option key={a.id} value={a.id}>{a.assettdesc}</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="warranty">Warranty<span className="required">*</span></label>
                                <input type="text" name="warranty" defaultValue={asset.warranty}></input>
                            </div>
                        </div>
                        
                        {(this.state.customers[0])
                            ? (
                            <div className="form-group col3">
                                <div>
                                    <label htmlFor="owner">Owner<span className="required">*</span></label>
                                    <select name="owner">
                                        <option value="">Select an Owner</option>
                                        {this.state.customers.map(c => 
                                            (asset.owner === c.data.name)
                                                ? <option key={c.data.id} value={c.data.id} selected>{c.data.name}</option>
                                                : <option key={c.data.id} value={c.data.id}>{c.data.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="tenant">Tenant<span className="required">*</span></label>
                                    <select name="tenant">
                                        <option value="">Select a Tenant</option>
                                        {this.state.customers.map(c => 
                                            (asset.tenant === c.data.name)
                                                ? <option key={c.data.id} value={c.data.id} selected>{c.data.name}</option>
                                                : <option key={c.data.id} value={c.data.id}>{c.data.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="brokers">Broker<span className="required">*</span></label>
                                    <select name="brokers">
                                        <option value="">Select a Broker</option>
                                        {this.state.brokers.map(b => 
                                            (asset.broker === b.data.name)
                                                ? <option key={b.data.id} value={b.data.id} selected>{b.data.name}</option>
                                                : <option key={b.data.id} value={b.data.id}>{b.data.name}</option>
                                        )}
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
                                    {this.state.process.map(p => 
                                        (asset.processt === p.data.processdesc)
                                            ? <option key={p.data.id} value={p.data.id} selected>{p.data.processdesc}</option>
                                            : <option key={p.data.id} value={p.data.id}>{p.data.processdesc}</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="steps">Steps<span className="required">*</span></label>
                                <select name="steps">
                                    <option value="">Select a Step</option>
                                    {this.state.steps.map(s => 
                                    (asset.step === s.stepdesc)
                                       ? <option key={s.id} value={s.id} selected>{s.stepdesc}</option>
                                       : <option key={s.id} value={s.id}>{s.stepdesc}</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="step_date">Step Date<span className="required">*</span></label>
                                <input type="date" name="step_date" defaultValue={asset.stepdate}></input>
                            </div>
                        </div>

                        <div className="form-group col3">
                            <div>
                                <label htmlFor="category">Category<span className="required">*</span></label>
                                <select name="category">
                                    <option value="">Select a Category</option>
                                    {this.state.categories.map(p => 
                                        (asset.category === p.ccategdesc)
                                            ? <option key={p.id} value={p.id} selected>{p.ccategdesc}</option>
                                            : <option key={p.id} value={p.id}>{p.ccategdesc}</option>
                                    )}
                                </select>
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

                    <div className="form-content-section">
                        <h3>Contract Information</h3>
                        <div className="form-group">
                            <div>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Upload Contract'
                                    onChange={(e) => this.props.contractOnChange(e)}
                                    imgExtension={['.pdf']}
                                    accept="application/pdf"
                                    maxFileSize={5242880}
                                    className="image-uploader"
                                    name="contract"
                                    label="Max file size: 5mb | accepted: pdf"
                                />
                                <div className="images-container">
                                {(contract) 
                                ? contract.map((file, i) => {
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

                                <div className="form-group">
                                    <label htmlFor="yes">Email contract<span className="required">*</span></label>
                                    <div className="radio-grid" onChange={(e) => this.props.setValue(e)}>
                                        <input type="radio" name="yes" value="true"></input>
                                        <label htmlFor="yes">Yes</label>
                                        <input type="radio" name="yes" value="false"></input>
                                        <label htmlFor="yes">No</label>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div>
                                        <label htmlFor="rentadjustment">Rent Adjustment<span className="required">*</span></label>
                                        <input type="text" name="rentadjustment" defaultValue={asset.rentadjustment}></input>
                                    </div>
                                    <div>
                                        <label htmlFor="endorsment">Endorsment<span className="required">*</span></label>
                                        <input type="text" name="endorsment" defaultValue={asset.endorsment}></input>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div>
                                        <label htmlFor="interestrent">Interest<span className="required">*</span></label>
                                        <input type="text" name="interestrent" defaultValue={asset.interestrent}></input>
                                    </div>
                                    <div>
                                        <label htmlFor="daysbeforeexp">Days Before Expiration<span className="required">*</span></label>
                                        <input type="text" name="daysbeforeexp" defaultValue={asset.daysbeforeexp}></input>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div>
                                        <label htmlFor="assetstart">Contract Start<span className="required">*</span></label>
                                        <input type="date" name="assetstart" defaultValue={asset.assetstart}></input>
                                    </div>
                                    <div>
                                        <label htmlFor="assetdue">Contract End<span className="required">*</span></label>
                                        <input type="date" name="assetdue" defaultValue={asset.assetdue}></input>
                                    </div>
                                </div>
                        </div>
                    </div>

                    {(this.props.loading)
                        ? <div className="loading-property">
                            <CircularProgress />
                        </div>
                        : (
                        <input type="submit" className="submit" value={this.props.button}></input>
                        )
                    }
                </div>
            </form>
        )
    }
}

export default PropertyForm