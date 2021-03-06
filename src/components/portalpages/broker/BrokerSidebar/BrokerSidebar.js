import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../config'
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import BrokerContext from '../../../../contexts/BrokerContext'
import BuildIcon from '@material-ui/icons/Build';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ApiService from '../../../../services/api-service'

class BrokerSidebar extends Component {
    static contextType = BrokerContext

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            title: '',
            firstname: '',
            lastname: '',
            alert: false,
            user: ''
        };
    }

    setFirst = (first) => {
        const firstChar = first.slice(0, 1).toUpperCase()
        const rest = first.slice(1, first.length)
        const firstname = firstChar + rest
        this.setState({
            firstname
        })
    }

    setLast = (last) => {
        const firstChar = last.slice(0, 1).toUpperCase()
        const rest = last.slice(1, last.length)
        const lastname = firstChar + rest
        this.setState({
            lastname
        })
    }

    highlight = (str) => {
        const name = document.getElementsByClassName('name')
        if(name.innerText === str){
            console.log(str)
        }
    }
    
    setUser = user => {
        this.setState({
            user
        })
    }

    componentDidMount(){
        const id = sessionStorage.getItem('id')
        ApiService.getDataHalf(`${config.API_ENDPOINT}/users/${id}`)
            .then(data => {
                this.setUser(data.data)
                this.setFirst(data.data.firstname)
                this.setLast(data.data.lastname)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/assets/0/assetcomments`)
        .then(data => {
            if(data.assetcomments[0]){
                this.setState({ alert: true })
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){
        this.highlight('Dashboard');
        return (
            <div className={`${(this.context.active) ? null : 'collapsed'} dash-sidebar-container`}>
                <div className='admin-info'>
                <img className={ `${(this.context.active) ? null : 'collapsed'} profile-img-icon`} src={this.state.user.photo_url} alt="profile icon" />
                    <h2 className={(this.context.active) ? null : 'collapsed'}>{this.state.firstname} {this.state.lastname}</h2>
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
                            <p className={`${(this.context.active) ? null : 'collapsed'} name`}>Dashboard</p>
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
                            <div className="alert-link">
                                <NotificationsActiveIcon />
                                {(alert) ? <span>&#x2022;</span> : null}
                            </div>
                            <p className={(this.context.active) ? null : 'collapsed'}>Alerts</p>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default BrokerSidebar