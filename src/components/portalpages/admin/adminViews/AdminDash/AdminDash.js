import React, { Component } from 'react'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import CompanyDash from '../../../../../images/CompanyDash.png'

class AdminDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyInfo: []
        };
    }
    
    setCompanyInfo = companyInfo => {
        this.setState({
            companyInfo
        })
    }

    componentDidMount(){
        ApiService.getDataHalf(`${config.API_ENDPOINT}/companies`)
            .then(data => {
                console.log(data)
                this.setCompanyInfo(data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return (
            <div className='dash-container'>
                {/* <h2>Welcome {this.state.companyInfo.company}</h2> */}
                <div className="dash-stats">
                    <img src={CompanyDash} alt="Company Dashboard"/>
                </div>
            </div>
        )
    }
}

export default AdminDash