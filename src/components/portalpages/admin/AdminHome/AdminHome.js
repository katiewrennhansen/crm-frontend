import React, { Component } from 'react'
import AdminNav from '../AdminNav/AdminNav'
import AdminSidebar from '../AdminSidebar/AdminSidebar'

class AdminHome extends Component {
    render(){
        return (
            <div className='dashboard-container'>
                <div className='nav'>
                    <AdminNav />
                </div>
                <AdminSidebar />
                <div>Dashboard</div>
            </div>
        )
    }
}

export default AdminHome