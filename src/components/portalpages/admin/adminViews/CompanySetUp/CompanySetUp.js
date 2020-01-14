import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import EditIcon from '@material-ui/icons/Edit';
import CompanyInfo from '../../../../utilities/CustomerComponents/CompanyInfo'

class CompanySetUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyInfo: [],
            error: null
        };
    }
    
    setCompanyInfo = companyInfo => {
        this.setState({
            companyInfo: companyInfo,
            error: null
        })
    }
    updateCompanyInfo = data => {
        this.setState({
            companyInfo: data,
            error: null
        })
    }

    componentDidMount(){
        fetch(config.COMPANY_SETUP_ENDPOINT, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
        })
        .then(data => {
            this.setCompanyInfo(data.data)
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    render(){
        const data = this.state.companyInfo
        return (
            <div className='container contact-container'>
                <div className='header-grid'>
                    <h2>{data.company}</h2>
                    <div className="property-icons">  
                        <Link className="add-icon" to='/dashboard/edit-account-settings'>
                            <EditIcon 
                                className="action-icon"
                            />
                        </Link>
                    </div>
                </div>
                <CompanyInfo 
                    data={data}
                />
            </div>
        )
    }
}

export default CompanySetUp