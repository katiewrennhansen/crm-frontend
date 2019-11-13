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
            {
            (!this.props.title) ? <h1>Dashboard</h1> : <h1>{this.props.title}</h1>
            }   
                <nav className='dashboard-nav'>
                    <Link 
                        className='account-nav-link' 
                        to='/' 
                        style={{textDecoration: 'none'}}
                        // onClick={() => this.props.handleTitle('Account Settings')}                        
                    >
                        <p className='account'>Website</p>
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