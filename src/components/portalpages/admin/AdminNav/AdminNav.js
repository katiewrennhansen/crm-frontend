import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './AdminNav.css'
import LogoutButton from '../../../Login/LoginComponents/LogoutButton'
 
class AdminNav extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            usertype: 'user',
            redirect: false,
            authenticated: false
        }

    }


    render() {
        return (
            <div className='dash-header'>
                <h1>Dashboard</h1>
                <nav className='dashboard-nav'>
                    <Link className='account-nav-link' to='/dashboard' style={{textDecoration: 'none'}}>
                        <p className='account'>Account</p>
                    </Link>
                    <LogoutButton 
                        className='dash-nav-logout' 
                        text='logout'
                        handleLogout={this.props.logout}
                    />               
                </nav>
            </div>
        )
    }
}

export default AdminNav