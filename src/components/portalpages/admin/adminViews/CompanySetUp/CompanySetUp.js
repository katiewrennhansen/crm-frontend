import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import './CompanySetUp.css'

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
            <div className="company-info-container">
                <div className="company-info">
                    <h2>{data.company}</h2>
                    <h3>Contact: {data.contact}</h3>
                    <p>Email: {data.email}</p>
                    <p>Phone: {data.phone}</p>
                    <p>Tax ID: {data.ctax_id}</p>
                    <br></br>
                    <h3>Address</h3>
                    <address>
                        {data.adescription3}<br></br>
                        {`${data.adescription2}, ${data.adescription5} ${data.adescription4}`}<br></br>
                        {data.adescription1}
                    </address>
                </div>
                <div>
                    <Link 
                        className="company-btn edit"
                        to='/dashboard/edit-account-settings'
                    >
                        Edit Company
                    </Link>
                </div>
            </div>
        )
    }
}

export default CompanySetUp