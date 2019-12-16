import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import BrokerContext from '../../../../contexts/BrokerContext'
import BuildIcon from '@material-ui/icons/Build';
import EventNoteIcon from '@material-ui/icons/EventNote';


class BrokerSidebar extends Component {
    static contextType = BrokerContext

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            title: ''
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
                    <h2 className={(this.context.active) ? null : 'collapsed'}>Broker Name</h2>
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
                            to="/broker" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Dashboard')}
                        >
                            <DashboardIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/properties" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Properties')}
                        >
                            <HomeWorkIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Properties</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/promotions" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Promotions')}
                        >
                            <CardGiftcardIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Promotions</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/maintenance" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Maintenance')}
                        >
                            <BuildIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Maintenance</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/reminders" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Reminders')}                        
                        >
                            <EventNoteIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Reminders</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/network" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Network')}                                                    
                        >
                            <ChatBubbleOutlineIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Network</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/contacts" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Contacts')}                        
                        >
                            <AccountBoxIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Contacts</p>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/broker/alerts" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Alerts')}                        
                        >
                            <NotificationsActiveIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Alerts</p>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default BrokerSidebar