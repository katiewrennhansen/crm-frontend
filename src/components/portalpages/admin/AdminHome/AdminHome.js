import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AdminNav from '../AdminNav/AdminNav'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import AdminDash from '../adminViews/AdminDash/AdminDash'
import AdminComments from '../adminViews/AdminComments/AdminComments'
import Promotions from '../adminViews/Promotions/Promotions'
import Maintenance from '../adminViews/Maintenance/Maintenance'
import PropertyFeatures from '../adminViews/PropertyFeatures/PropertyFeatures'
import PropertyStatus from '../adminViews/PropertyStatus/PropertyStatus'
import CustomerStatus from '../adminViews/CustomerStatus/CustomerStatus'
import Reminders from '../adminViews/Reminders/Reminders'
import AccountSettings from '../adminViews/AccountSettings/AccountSettings'
import EditSettings from '../adminViews/AccountSettings/EditSettings'

import './AdminHome.css'

class AdminHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: ''
        }
    }

    handleTitle = (title) => {
        this.setState({
            title: title
        })
    }
  
    render(){
        return (
            <div className='dashboard-container'>
                <div className='dash-sidebar'>
                    <AdminSidebar 
                        handleTitle={this.handleTitle}
                    />
                </div>
                <div className='dash-nav'>
                    <AdminNav 
                        logout={this.props.logout}
                        title={this.state.title}
                        handleTitle={this.handleTitle}
                    />
                </div>
                <div className='dash-home'>
                    <Switch>
                        <Route 
                            path='/dashboard/home' 
                            render={(props) => {
                                return (
                                  <AdminDash
                                    name={this.props.name}
                                  />
                                )
                              }}
                        />
                        <Route 
                            path='/dashboard/comments' 
                            render={(props) => {
                                return (
                                  <AdminComments
                                    name={this.props.name}
                                  />
                                )
                              }}
                        />
                        <Route path='/dashboard/promotions' component={Promotions} />
                        <Route path='/dashboard/maintenance' component={Maintenance} />
                        <Route path='/dashboard/property-features' component={PropertyFeatures} />
                        <Route path='/dashboard/property-status' component={PropertyStatus} />
                        <Route path='/dashboard/customer-status' component={CustomerStatus} />
                        <Route path='/dashboard/reminders' component={Reminders} />
                        <Route path='/dashboard/account-settings' component={AccountSettings} />
                        <Route path='/dashboard/edit-account-settings' component={EditSettings} />                        
                    </Switch>
                </div>
            </div>
        )
    }
}

export default AdminHome