import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BuildIcon from '@material-ui/icons/Build';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import WorkIcon from '@material-ui/icons/Work';
import DescriptionIcon from '@material-ui/icons/Description';
import WeekendIcon from '@material-ui/icons/Weekend';
import CategoryIcon from '@material-ui/icons/Category';
import AdminContext from '../../../../contexts/AdminContext'
import EventNoteIcon from '@material-ui/icons/EventNote';
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import './AdminSidebar.css'




class AdminSidebar extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }


    render(){

        return (
            <div className={`${(this.context.active) ? null : 'collapsed'} dash-sidebar-container`}>
                <div className='admin-info'>
                    <AccountCircleIcon
                        fontSize='large'
                        className={`${(this.context.active) ? null : 'collapsed'} icon`}
                    />
                    <h2 className={(this.context.active) ? null : 'collapsed'} >Admin</h2>
                    <button className="toggle-btn"  aria-label="toggle-nav" onClick={this.context.toggleNav}>
                        <div className="burger-bar"></div>
                        <div className="burger-bar"></div>
                        <div className="burger-bar half"></div>
                    </button>
                </div>
                <hr />
                <ul className={`${(this.context.active) ? null : 'collapsed'} dash-nav-ul`}>
                    <li>
                        <Link 
                            to="/dashboard" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Dashboard')}
                        >
                            <DashboardIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/company-setup" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Company Set Up')}
                        >
                            <WorkIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Company Set Up</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/comments" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Comments Type')}
                        >
                            <ChatBubbleOutlineIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Comments Type</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/categories" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Categories')}
                        >
                            <CategoryIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Categories</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/transactions" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Transactions')}
                        >
                            <PaymentIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Transactions</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/banks" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Banks')}
                        >
                            <AccountBalanceIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Banks</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/promotions" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Promotions')}
                        >
                            <CardGiftcardIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Promotions</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/maintenance" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Maintenance')}
                        >
                            <BuildIcon />
                            <p className={(this.context.active) ? null : 'collapsed'} >Maintenance</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/property-features" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Property Features')}                        
                        >
                            <HomeIcon />
                            <p className={(this.context.active) ? null : 'collapsed'} >Property Features</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/property-status" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Property Status')}                                                    
                        >
                            <HomeWorkIcon />
                            <p className={(this.context.active) ? null : 'collapsed'} >Property Status</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/customer-status" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Customer Status')}                        
                        >
                            <AccountBoxIcon />
                            <p className={(this.context.active) ? null : 'collapsed'} >Customer Status</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/reminders" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Reminders')}                        
                        >
                            <EventNoteIcon />
                            <p className={(this.context.active) ? null : 'collapsed'} >Reminders</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/asset-type" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Assest Type')}                        
                        >
                            <WeekendIcon />
                            <p className={(this.context.active) ? null : 'collapsed'} >Asset Type</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/process" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Process')}                        
                        >
                            <DescriptionIcon />
                            <p className={(this.context.active) ? null : 'collapsed'} >Process</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/customer-accounts" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Customer Accounts')}                        
                        >
                            <EmojiPeopleIcon />
                            <p className={(this.context.active) ? null : 'collapsed'} >Customer Accounts</p>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default AdminSidebar