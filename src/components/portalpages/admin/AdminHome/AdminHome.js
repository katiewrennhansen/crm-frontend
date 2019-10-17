import React, { Component } from 'react'
import AdminNav from '../AdminNav/AdminNav'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import './AdminHome.css'

class AdminHome extends Component {
    render(){
        return (
            <div className='dashboard-container'>
                <div className='dash-nav'>
                    <AdminNav 
                        logout={this.props.logout}
                    />
                </div>
                <div className='dash-sidebar'>
                    <AdminSidebar />
                </div>
                <div className='dash-home'>
                    <div>Dashboard</div>
                </div>
            </div>
        )
    }
}

export default AdminHome