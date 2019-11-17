import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
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
import ProcessSteps from '../adminViews/Process/ProcessSteps'
import CustomerAccounts from '../adminViews/CustomerAccounts/CustomerAccounts'
import CustomerPage from '../adminViews/CustomerAccounts/CustomerPage'
import CompanySetUp from '../adminViews/CompanySetUp/CompanySetUp'
import AssetType from '../adminViews/AssetType/AssetType'
 import { AdminProvider } from '../../../../AdminContext'
import './AdminHome.css'


class AdminHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            delete: false,
            updatedContent: ''
        }
        // this.handleCommentChange = this.handleCommentChange.bind(this);
    }

    handleTitle = (title) => {
        this.setState({
            title: title
        })
    }

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
        this.showDelete();
        this.setState({ 
            toDelete: {
                name: name,
                id: id
            } 
        }); 
    };

    // handleCommentChange = e => {
    //     this.setState({
    //         updatedContent: e.target.value
    //     })
    // }

    formatPriceUSD = (amount) => {
        const thousands = ","
        let i = parseInt(amount = Math.abs(Number(amount) || 0)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;
        return "$" + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands);
    }
  
    render(){
        const propFunctions = {
            name: this.props.name,
            showDelete: this.showDelete,
            hideDelete: this.hideDelete,
            deleteModal: this.deleteModal,
            updateDelete: this.updateDelete,
        }
        return (
            <AdminProvider>
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
                                  <AdminDash name={this.props.name} />
                                )
                              }}
                        />
                        <Route 
                            path='/dashboard/company-setup' 
                            render={(props) => {
                                return (
                                  <CompanySetUp func={propFunctions} />
                                )
                              }}
                        />
                        <Route 
                            path='/dashboard/comments' 
                            render={(props) => {
                                return (
                                  <AdminComments />
                                )
                              }}
                        />
                        <Route 
                        path='/dashboard/promotions' 
                        render={(props) => {
                            return (
                                <Promotions 
                                    func={propFunctions}
                                    formatPrice={this.formatPriceUSD} 
                                />
                            )
                            }}
                        />
                        <Route 
                        path='/dashboard/maintenance' 
                        render={(props) => {
                            return (
                                <Maintenance />
                            )
                            }}
                        />
                        <Route 
                        path='/dashboard/property-features' 
                        render={(props) => {
                            return (
                                <PropertyFeatures />
                            )
                            }}
                        />
                        <Route 
                        path='/dashboard/property-status' 
                        render={(props) => {
                            return (
                                <PropertyStatus />
                            )
                            }}
                        />
                        <Route 
                        path='/dashboard/customer-status' 
                        render={(props) => {
                            return (
                                <CustomerStatus />
                            )
                            }}
                        />
                        <Route 
                        path='/dashboard/reminders' 
                        render={(props) => {
                            return (
                                <Reminders />
                            )
                            }}
                        />
                        <Route 
                        path='/dashboard/asset-type' 
                        render={(props) => {
                            return (
                                <AssetType />
                            )
                            }}
                        />
                        <Route 
                        exact path='/dashboard/process' 
                        render={(props) => {
                            return (
                                <Process func={propFunctions} />
                            )
                            }}
                        />
                        <Route 
                            exact path='/dashboard/process/:id' 
                            render={(history) => {
                                const id = history.match.params.id;
                                return (
                                    <ProcessSteps 
                                        func={propFunctions} 
                                        id={id}
                                    />
                                )
                                }}
                        />
                        <Route 
                            exact path='/dashboard/customer-accounts' 
                            render={(props) => {
                                return (
                                    <CustomerAccounts func={propFunctions} />
                                )
                                }}
                        />
                        <Route 
                            exact path='/dashboard/customer-accounts/:id' 
                            render={(history) => {
                                const id = history.match.params.id;
                                return (
                                    <CustomerPage 
                                        func={propFunctions} 
                                        id={id}
                                    />
                                )
                                }}
                        />
                        <Route path='/dashboard/edit-account-settings' component={EditSettings} />                        
                    </Switch>
                </div>
            </div>
            </AdminProvider>
        )
    }
}

export default withRouter(AdminHome)