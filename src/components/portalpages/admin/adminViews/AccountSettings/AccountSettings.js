import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import './AdminComments.css'

class AccountSettings extends Component {
    render(){
        return (
            <div className='admin-dashboard'>
                <div className='company-info-container'>
                    <h3>FirstName LastName</h3>
                    <p>Company: </p>
                    <p>Address: </p>
                    <p>Email: </p>
                    <p>Phone: </p>
                    <p>Country: </p>
                </div>

                

                <Link to='/dashboard/edit-account-settings'>Edit</Link>
                
                <div>
                    <h3>Change Password</h3>
                    <button>Change Password</button>
                </div>
            </div>
        )
    }
}

export default AccountSettings