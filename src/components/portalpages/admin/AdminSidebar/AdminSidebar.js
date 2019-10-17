import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { DashboardIcon } from '@material-ui/icons';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './AdminSidebar.css'

class AdminSidebar extends Component {
    render(){
        return (
            <div className='dash-sidebar-container'>
                <div className='admin-info'>
                    <AccountCircleIcon />
                    <h1>Admin</h1>
                </div>
                <hr />
                <ul className='dash-nav-ul'>
                    <li>
                        <Link to="/" className='dash-nav-link'>
                            <DashboardIcon />
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li >
                        <Link to="/" className='dash-nav-link'>
                            <DashboardIcon />
                            <p>Comments Type</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className='dash-nav-link'>
                            <DashboardIcon />
                            <p>Promotion</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className='dash-nav-link'>
                            <DashboardIcon />
                            <p>Maintenance</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className='dash-nav-link'>
                            <DashboardIcon />
                            <p>Property Features</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className='dash-nav-link'>
                            <DashboardIcon />
                            <p>Property Status</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className='dash-nav-link'>
                            <DashboardIcon />
                            <p>Customer Status</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className='dash-nav-link'>
                            <DashboardIcon />
                            <p>Reminders</p>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default AdminSidebar