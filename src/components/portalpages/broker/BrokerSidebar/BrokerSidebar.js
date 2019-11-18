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
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import WorkIcon from '@material-ui/icons/Work';
import DescriptionIcon from '@material-ui/icons/Description';



class BrokerSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
    }

    toggleAccordion(){
        const currentState = this.state.active;
        this.setState({
            active: !currentState
        })
    }

    render(){

        return (
            <div className='dash-sidebar-container'>
                <div className='admin-info'>
                    <AccountCircleIcon 
                        fontSize='large'
                    />
                    <h2>Broker Name</h2>
                </div>
                <hr />
                <ul className='dash-nav-ul'>
                    <li>
                        <Link 
                            to="/broker" 
                            className='dash-nav-link'
                            onClick={() => this.props.handleTitle('Dashboard')}
                        >
                            <DashboardIcon />
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/properties" 
                            className='dash-nav-link'
                            onClick={() => {this.props.handleTitle('Company Set Up'); this.toggleAccordion();}}
                        >
                            <WorkIcon />
                            <p>Company Set Up</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/promotions" 
                            className='dash-nav-link'
                            onClick={() => this.props.handleTitle('Comments Type')}
                        >
                            <ChatBubbleOutlineIcon />
                            <p>Comments Type</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/maintenance" 
                            className='dash-nav-link'
                            onClick={() => this.props.handleTitle('Promotions')}
                        >
                            <CardGiftcardIcon />
                            <p>Promotions</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/maintenance" 
                            className='dash-nav-link'
                            onClick={() => this.props.handleTitle('Maintenance')}
                        >
                            <BuildIcon />
                            <p>Maintenance</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/reminders" 
                            className='dash-nav-link'
                            onClick={() => this.props.handleTitle('Property Features')}                        
                        >
                            <HomeIcon />
                            <p>Property Features</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/network" 
                            className='dash-nav-link'
                            onClick={() => this.props.handleTitle('Property Status')}                                                    
                        >
                            <HomeWorkIcon />
                            <p>Property Status</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/contacts" 
                            className='dash-nav-link'
                            onClick={() => this.props.handleTitle('Customer Status')}                        
                        >
                            <AccountBoxIcon />
                            <p>Customer Status</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker" 
                            className='dash-nav-link'
                            onClick={() => this.props.handleTitle('Reminders')}                        
                        >
                            <NotificationsActiveIcon />
                            <p>Reminders</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/asset-type" 
                            className='dash-nav-link'
                            onClick={() => this.props.handleTitle('Assest Type')}                        
                        >
                            <NotificationsActiveIcon />
                            <p>Assest Type</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/process" 
                            className='dash-nav-link'
                            onClick={() => this.props.handleTitle('Process')}                        
                        >
                            <DescriptionIcon />
                            <p>Process</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/dashboard/customer-accounts" 
                            className='dash-nav-link'
                            onClick={() => this.props.handleTitle('Customer Accounts')}                        
                        >
                            <EmojiPeopleIcon />
                            <p>Customer Accounts</p>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default BrokerSidebar