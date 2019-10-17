import React, { Component } from 'react'
// import { DashboardIcon } from '@material-ui/icons';
import DashboardIcon from '@material-ui/icons/Dashboard';
import './AdminSidebar.css'

class AdminSidebar extends Component {
    render(){
        return (
            <>
                <h1>Admin </h1>
                <hr />
                <ul>
                    <li className='dash-nav-link'>
                        <DashboardIcon />
                        <p>Dashboard</p>
                    </li>
                    <li className='dash-nav-link'>
                        <DashboardIcon />
                        <p>Comments Type</p>
                    </li>
                    <li className='dash-nav-link'>
                        <DashboardIcon />
                        <p>Promotion</p>
                    </li>
                    <li className='dash-nav-link'>
                        <DashboardIcon />
                        <p>Maintenance</p>
                    </li>
                    <li className='dash-nav-link'>
                        <DashboardIcon />
                        <p>Property Features</p>
                    </li>
                    <li className='dash-nav-link'>
                        <DashboardIcon />
                        <p>Property Status</p>
                    </li>
                    <li className='dash-nav-link'>
                        <DashboardIcon />
                        <p>Customer Status</p>
                    </li>
                    <li className='dash-nav-link'>
                        <DashboardIcon />
                        <p>Reminder</p>
                    </li>
                </ul>
            </>
        )
    }
}

export default AdminSidebar