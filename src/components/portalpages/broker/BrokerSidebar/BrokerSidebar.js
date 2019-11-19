import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import WorkIcon from '@material-ui/icons/Work';



class BrokerSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            title: ''
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
                            onClick={() => this.props.handleTitle('Properties')}
                        >
                            <WorkIcon />
                            <p>Properties</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/promotions" 
                            className='dash-nav-link'
                            onClick={() => this.props.handleTitle('Promotions')}
                        >
                            <ChatBubbleOutlineIcon />
                            <p>Promotions</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/maintenance" 
                            className='dash-nav-link'
                            onClick={() => this.props.handleTitle('Maintenance')}
                        >
                            <CardGiftcardIcon />
                            <p>Maintenance</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/reminders" 
                            className='dash-nav-link'
                            onClick={() => this.props.handleTitle('Reminders')}                        
                        >
                            <HomeIcon />
                            <p>Reminders</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/network" 
                            className='dash-nav-link'
                            onClick={() => this.props.handleTitle('Network')}                                                    
                        >
                            <HomeWorkIcon />
                            <p>Network</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/contacts" 
                            className='dash-nav-link'
                            onClick={() => this.props.handleTitle('Contacts')}                        
                        >
                            <AccountBoxIcon />
                            <p>Contacts</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/alerts" 
                            className='dash-nav-link'
                            onClick={() => this.props.handleTitle('Alerts')}                        
                        >
                            <NotificationsActiveIcon />
                            <p>Alerts</p>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default BrokerSidebar