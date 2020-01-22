import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserContext from '../../../../contexts/UserContext'
import ApiService from '../../../../services/api-service'
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PaymentIcon from '@material-ui/icons/Payment';
import BuildIcon from '@material-ui/icons/Build';
import EventNoteIcon from '@material-ui/icons/EventNote';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

class UserSidebar extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            title: '',
            firstname: '',
            lastname: '',
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

    componentDidMount(){
        const id = sessionStorage.getItem('id')
        const endpoint = `http://crmmia-api.herokuapp.com/api/users/${id}`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setFirst(data.data.firstname)
                this.setLast(data.data.lastname)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return (
            <div className={`${(this.context.active) ? null : 'collapsed'} dash-sidebar-container`}>
                <div className='admin-info'>
                    <AccountCircleIcon 
                        fontSize='large'
                        className={`${(this.context.active) ? null : 'collapsed'} icon`}
                    />
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
                            to="/user" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Dashboard')}
                        >
                            <DashboardIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Dashboard</p>
                        </Link>
                        <Link 
                            to="/user/properties" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('My Properties')}
                        >
                            <HomeWorkIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>My Properties</p>
                        </Link>
                        <Link 
                            to="/user/visit-requests" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Visit Requests')}
                        >
                            <EventNoteIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Visit Requests</p>
                        </Link>
                        <Link 
                            to="/user/maintenance" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Maintenance')}
                        >
                            <BuildIcon />
                            <p className={(this.context.active) ? null : 'collapsed'}>Maintenance</p>
                        </Link>
                        <Link 
                            to="/user/payments" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Payments')}
                        >
                            <PaymentIcon  />
                            <p className={(this.context.active) ? null : 'collapsed'}>Payments</p>
                        </Link>
                        <Link 
                            to="/user/contracts" 
                            className={`${(this.context.active) ? null : 'collapsed'} dash-nav-link`}
                            onClick={() => this.props.handleTitle('Contracts')}
                        >
                            <InsertDriveFileIcon  />
                            <p className={(this.context.active) ? null : 'collapsed'}>Contracts</p>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default UserSidebar