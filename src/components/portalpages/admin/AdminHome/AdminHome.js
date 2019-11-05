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
            title: '',
            show: false,
            delete: false
        }
    }

    handleTitle = (title) => {
        this.setState({
            title: title
        })
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    showDelete = () => {
        this.setState({ delete: true });
    };

    hideDelete = () => {
        this.setState({ delete: false });
    }

    formatDate(){
        const newDate = new Date();
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1; 
        const year = newDate.getFullYear();
        if(day < 10){
            day = `0${day}`;
        } 
        if(month < 10){
            month = `0${month}`;
        } 
        const today = `${month}/${day}/${year}`;
        return today;
    }
  
    render(){

        // const func = {
        //     name: this.props.name,
        //     showModal: this.showModal,
        //     hideModal: this.hideModal,
        //     showDelete: this.showDelete,
        //     hideDelete: this.hideDelete,
        //     show: this.state.show,
        //     delete: this.state.delete,
        //     formatDate: this.formatDate
        // }

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
                                    showModal={this.showModal}
                                    hideModal={this.hideModal}
                                    showDelete={this.showDelete}
                                    hideDelete={this.hideDelete}
                                    show={this.state.show}
                                    delete={this.state.delete}
                                    formatDate={this.formatDate}
                                  />
                                )
                              }}
                        />
                        <Route 
                        path='/dashboard/promotions' 
                        render={(props) => {
                            return (
                                <Promotions
                                    name={this.props.name}
                                    showModal={this.showModal}
                                    hideModal={this.hideModal}
                                    showDelete={this.showDelete}
                                    hideDelete={this.hideDelete}
                                    show={this.state.show}
                                    delete={this.state.delete}
                                    formatDate={this.formatDate}
                                />
                            )
                            }}
                        />
                        <Route 
                        path='/dashboard/maintenance' 
                        render={(props) => {
                            return (
                                <Maintenance
                                    name={this.props.name}
                                    showModal={this.showModal}
                                    hideModal={this.hideModal}
                                    showDelete={this.showDelete}
                                    hideDelete={this.hideDelete}
                                    show={this.state.show}
                                    delete={this.state.delete}
                                    formatDate={this.formatDate}
                                />
                            )
                            }}
                        />
                        <Route 
                        path='/dashboard/property-features' 
                        render={(props) => {
                            return (
                                <PropertyFeatures
                                    name={this.props.name}
                                    showModal={this.showModal}
                                    hideModal={this.hideModal}
                                    showDelete={this.showDelete}
                                    hideDelete={this.hideDelete}
                                    show={this.state.show}
                                    delete={this.state.delete}
                                    formatDate={this.formatDate}
                                />
                            )
                            }}
                        />
                        <Route 
                        path='/dashboard/property-status' 
                        render={(props) => {
                            return (
                                <PropertyStatus
                                    name={this.props.name}
                                    showModal={this.showModal}
                                    hideModal={this.hideModal}
                                    showDelete={this.showDelete}
                                    hideDelete={this.hideDelete}
                                    show={this.state.show}
                                    delete={this.state.delete}
                                    formatDate={this.formatDate}
                                />
                            )
                            }}
                        />
                        <Route path='/dashboard/customer-status' component={CustomerStatus} />
                        <Route 
                        path='/dashboard/reminders' 
                        render={(props) => {
                            return (
                                <Reminders
                                    name={this.props.name}
                                    showModal={this.showModal}
                                    hideModal={this.hideModal}
                                    showDelete={this.showDelete}
                                    hideDelete={this.hideDelete}
                                    show={this.state.show}
                                    delete={this.state.delete}
                                    formatDate={this.formatDate}
                                />
                            )
                            }}
                        />
                        <Route path='/dashboard/account-settings' component={AccountSettings} />
                        <Route path='/dashboard/edit-account-settings' component={EditSettings} />                        
                    </Switch>
                </div>
            </div>
        )
    }
}

export default AdminHome