import React, { Component } from 'react'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import CompanyDash from '../../../../../images/CompanyDash.png'

class AdminDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: []
        };
    }
    
    setCompanyInfo = company => {
        this.setState({
            company
        })
    }

    componentDidMount(){
        ApiService.getDataHalf(`${config.API_ENDPOINT}/companies`)
            .then(data => this.setCompanyInfo(data.companies[0].data))
            .catch(error => console.log(error))
    }

    render(){
        return (
            <div className='dash-container'>
                <h2>Welcome {this.state.company.company}</h2>
                <div className="dash-stats">
                    <img src={CompanyDash} alt="Company Dashboard"/>
                </div>
            </div>
        )
    }
}

export default AdminDash






// WORKING ON ADDING HOOKS

// import React, { useState, useEffect } from 'react'

// export default function AdminDash() {
//     const endpoint = config.API_ENDPOINT
//     const [company, setCompany] = useState({})

//     useEffect(() => {
//         const abortController = new AbortController();
//         ApiService.getDataFromEffect(`${endpoint}/companies`, abortController)
//             .then(data => {
//                 console.log(data.companies)
//                 setCompany(data.companies)
//             })
//             .catch(error => {
//                 if (!abortController.signal.aborted) {
//                     console.log(error)
//                 }
//             })
//         return function cleanup(){
//             abortController.abort();
//         }
//     }, [endpoint])
    
//     return (
//         <div className='dash-container'>
//             {/* <h2>Welcome {company}</h2> */}
//             <div className="dash-stats">
//                 <img src={CompanyDash} alt="Company Dashboard"/>
//             </div>
//         </div>
//     )
// }
