import React, { Component } from 'react'
import AdminNav from '../../admin/AdminNav'
import AdminMenu from '../../AdminMenu/AdminMenu'
import './UserHome.css'

class UserHome extends Component {
    render(){
        return (
            <>
                {/* <AdminNav 
                    authenticated={this.props.authenticated}
                    logout={this.props.logout}
                /> */}
                <AdminMenu />
                <h1>User Home</h1>
            </>
        )
    }
}

export default UserHome