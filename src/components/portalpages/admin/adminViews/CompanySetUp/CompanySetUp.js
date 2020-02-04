import React, { Component } from 'react'
import ApiService from '../../../../../services/api-service'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import EditIcon from '@material-ui/icons/Edit';
import CompanyInfo from '../../../../utilities/CustomerComponents/CompanyInfo'

class CompanySetUp extends Component {
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
        const data = this.state.company
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