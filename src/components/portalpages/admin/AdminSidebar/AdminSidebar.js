import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BuildIcon from '@material-ui/icons/Build';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import './AdminSidebar.css'


class AdminSidebar extends Component {
    render(){
        return (
            <div className='dash-sidebar-container'>
                <div className='admin-info'>
                    <AccountCircleIcon 
                        fontSize='large'
                    />
                    <h2>Admin</h2>
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
                            <ChatBubbleOutlineIcon />
                            <p>Comments Type</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className='dash-nav-link'>
                            <CardGiftcardIcon />
                            <p>Promotion</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className='dash-nav-link'>
                            <BuildIcon />
                            <p>Maintenance</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className='dash-nav-link'>
                            <HomeIcon />
                            <p>Property Features</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className='dash-nav-link'>
                            <HomeWorkIcon />
                            <p>Property Status</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className='dash-nav-link'>
                            <AccountBoxIcon />
                            <p>Customer Status</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className='dash-nav-link'>
                            <NotificationsActiveIcon />
                            <p>Reminders</p>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default AdminSidebar