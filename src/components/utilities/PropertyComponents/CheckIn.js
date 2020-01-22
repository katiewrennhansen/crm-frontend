import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../config'
import ApiService from '../../../services/api-service'
import BrokerContext from '../../../contexts/BrokerContext'
import CloseIcon from '@material-ui/icons/Close';
import CheckInForm from '../Forms/CheckInForm'
import { PDFDownloadLink } from "@react-pdf/renderer";

class CheckIn extends Component {
    static contextType = BrokerContext

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            asset: [],
            signature: '',
            date: '',
            user: []
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
                    {(this.state.asset.assetdesc && this.state.user.email) && <PDFDownloadLink
                        document={
                            <CheckInForm
                                asset={this.state.asset}
                                user={this.state.user}
                            />
                        }
                        fileName="checkin.pdf"
                        className="contract-link submit"
                        >
                        Download PDF
                    </PDFDownloadLink>}
                    
                </div>
            {/* <form className="add-property-form" onSubmit={(e) => this.printDocument(e)}>
                <div className="inner-form-content">
                <p>Please review the following information carefully before signing.</p>
                <div id="divToPrint" className="mt4">
                    <h3>{this.state.asset.adescription4}</h3>

                    <div className="form-group row" >
                        <div>
                            <label htmlFor="signature">Signature<span className="required">*</span></label>
                            <input type="text" name="signature" onChange={this.handleChange} required></input>
                        </div>
                        <div>
                            <label htmlFor="date">Date<span className="required">*</span></label>
                            <input type="date" name="date" onChange={this.handleChange} required></input>
                        </div>
                    </div>
                    </div>
                    <input type="submit" class="submit" value="Download PDF"/>
                </div>
            </form> */}
            </div>
        )
    }
}

export default CheckIn