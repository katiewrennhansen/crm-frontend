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
import Process from '../adminViews/Process/Process'
import './AdminHome.css'
import CustomerAccounts from '../adminViews/CustomerAccounts/CustomerAccounts'
import CompanySetUp from '../adminViews/CompanySetUp/CompanySetUp'
import Modal from '../pagecomponents/Modal'




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

    showDelete = (id) => {
        this.setState({ delete: true });
        return (
                <Modal id={id} show='show'>
                    <h3>Are you sure you would like to deactivate</h3>
                    <button onClick={this.hideDelete}>Cancel</button>
                    <div className='delete'>
                        <button>Deactivate</button>
                    </div>
                </Modal>
            )
    };


  

    // openDelete = (id) => {
    //     let data = ADMIN_DATA.customerAccounts

    //     const el = data.find(c => {
    //         return c.customer.id === id
    //     })

    //     console.log(`${el.customer.name} clicked`)

    //     return (
    //         <Modal id={el.customer.id} show='show'>
    //             <h3>Are you sure you would like to deactivate {el.customer.name}</h3>
    //             <button onClick={this.hideDelete}>Cancel</button>
    //             <div className='delete'>
    //                 <button>Deactivate</button>
    //             </div>
    //         </Modal>
    //     )
    // }

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

                        {/* CUSTOMER ACCOUNTS */}

                        <Route path='/dashboard/account-settings' component={AccountSettings} />
                        <Route path='/dashboard/edit-account-settings' component={EditSettings} />                        
                    </Switch>
                </div>
            </div>
        )
    }
}

export default AdminHome