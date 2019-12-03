import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './AdminNav.css'
import TokenService from '../../../../services/token-service'
 
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

    logout = () => {
        TokenService.clearAuthToken();
        this.props.history.push('/')
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
                    >
                        <p className='account'>Website</p>
                    </Link>
                    <button 
                        className='logout admin-logout' 
                        onClick={this.logout}
                    >Logout</button>             
                </nav>
            </div>
        )
    }
}

export default AdminNav