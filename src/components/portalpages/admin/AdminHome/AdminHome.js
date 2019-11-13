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
import EditSettings from '../adminViews/AccountSettings/EditSettings'
import Process from '../adminViews/Process/Process'
import './AdminHome.css'
import CustomerAccounts from '../adminViews/CustomerAccounts/CustomerAccounts'
import CompanySetUp from '../adminViews/CompanySetUp/CompanySetUp'
import Modal from '../pagecomponents/Modal'
import config from '../../../../config'


function deleteData(endpont, id, cb){
    fetch(endpont + `/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${config.API_KEY}`
        }
    })
    .then((res) => {
        if(!res.ok){
            return res.json().then(error => Promise.reject(error))
        }
        return res.text()
    })
    .then(data => {
        cb(id)
    })
    .catch(error => {
        console.error(error)
    })
}


class AdminHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            show: false,
            delete: false,
            toDelete: {
                name: '',
                id: ''
            }
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

    updateDelete = (name, id) => {
        console.log(name + id + 'clicked')
        this.showDelete();
        this.setState({ 
            toDelete: {
                name: name,
                id: id
            } 
        }); 
    };

    deleteModal = (endpoint, removeFn) => {
        return (
            <Modal show={this.state.delete}>
                <h3>
                    Are you sure you would like to delete {this.state.toDelete.name}?
                </h3>
                <button onClick={this.hideDelete}>Cancel</button>
                <div className='delete'>
                    <button onClick={() => deleteData(endpoint, this.state.toDelete.id, removeFn)}>Delete</button>
                </div>
            </Modal>
        )
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
                            path='/dashboard/company-setup' 
                            render={(props) => {
                                return (
                                  <CompanySetUp
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
                                    deleteModal={this.deleteModal}
                                    updateDelete={this.updateDelete}
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
                                    deleteModal={this.deleteModal}
                                    updateDelete={this.updateDelete}
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
                                    deleteModal={this.deleteModal}
                                    updateDelete={this.updateDelete}
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
                        <Route 
                        path='/dashboard/customer-status' 
                        render={(props) => {
                            return (
                                <CustomerStatus
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
                        <Route 
                        path='/dashboard/process' 
                        render={(props) => {
                            return (
                                <Process
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
                            path='/dashboard/customer-accounts' 
                            render={(props) => {
                                return (
                                    <CustomerAccounts
                                        name={this.props.name}
                                        showModal={this.showModal}
                                        hideModal={this.hideModal}
                                        showDelete={this.showDelete}
                                        hideDelete={this.hideDelete}
                                        show={this.state.show}
                                        delete={this.state.delete}
                                        formatDate={this.formatDate}
                                        openDelete={this.openDelete}
                                    />
                                )
                                }}
                        />
                        <Route path='/dashboard/edit-account-settings' component={EditSettings} />                        
                    </Switch>
                </div>
            </div>
        )
    }
}

export default AdminHome