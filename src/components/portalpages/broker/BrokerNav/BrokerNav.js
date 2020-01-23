import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../../../services/token-service'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
 
class AdminNav extends Component {
    constructor(props){
        super(props)
        this.state = {
            usertype: 'user',
            dropdown: false
        }
    }

    logout = () => {
        TokenService.clearAuthToken();
        this.props.history.push('/')
    }

    activateDropdown = () => {
        if(this.state.dropdown){
            this.setState({
                dropdown: false
            })
        } else {
            this.setState({
                dropdown: true
            })
        }
    }

    render() {
        return (
            <div className='dash-header'>
            {(!this.props.title) ? <h1>Dashboard</h1> : <h1>{this.props.title}</h1>}   
                <nav className='dashboard-nav user-nav'>
                <SettingsIcon className="settings action-icon" onClick={this.activateDropdown}/>
                    {(this.state.dropdown)
                    ? <ul className="dropdown-content">
                        <li>
                            <Link to='/' onClick={this.activateDropdown}>
                                Website
                            </Link>
                        </li>
                        <li>
                            <Link to='/broker/account-settings' onClick={this.activateDropdown}>
                                Account Settings
                            </Link>
                        </li>
                        <li>
                            <button
                                className='admin-logout' 
                                onClick={this.logout}
                            >
                                <ExitToAppIcon />
                                <p>Logout</p>
                            </button> 
                        </li>
                    </ul>
                    : null
                    }           
                </nav>
            </div>
        )
    }
}

export default AdminNav