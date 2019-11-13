import React, { Component } from 'react'
import config from '../../../../../config'




class CompanySetUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false,
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
            <>
                <h2>{data.company}</h2>
                <h3>Contact: {data.contact}</h3>
                <p>Email: {data.email}</p>
                <p>Phone: {data.phone}</p>
                <br></br>
                <h3>Address</h3>
                <address>
                    {data.adescription3}<br></br>
                    {`${data.adescription2}, ${data.adescription5} ${data.adescription4}`}<br></br>
                    {data.adescription1}
                </address>
            </>
        )
    }
}

export default CompanySetUp