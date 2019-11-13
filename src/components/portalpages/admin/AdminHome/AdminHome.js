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
import CustomerAccounts from '../adminViews/CustomerAccounts/CustomerAccounts'
import CompanySetUp from '../adminViews/CompanySetUp/CompanySetUp'
import Modal from '../pagecomponents/Modal'
import TextInput from '../../../Login/LoginComponents/TextInput'
import config from '../../../../config'
import './AdminHome.css'


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
            update: false,
            toDelete: {
                name: '',
                id: ''
            },
            toUpdate: {
                name: '',
                id: ''
            },
            updatedContent: ''
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

    showUpdate = () => {
        this.setState({ update: true });
    };

    hideUpdate = () => {
        this.setState({ update: false });
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

    updateUpdate = (name, id) => {
        this.showUpdate();
        this.setState({ 
            toUpdate: {
                name: name,
                id: id
            } 
        }); 
    };

    handleCommentChange = e => {
        this.setState({
            updatedContent: e.target.value
        })
        console.log(this.state.updatedContent)
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.state.toUpdate.id
        // const title = e.target.comment_type.value
        const updatedContent = {
            commtype: {
                commdesc: 'Another New Comment'
            }
        }
        console.log(updatedContent, id)
        fetch(`${config.COMMENTS_ENDPOINT}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedContent),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then((res) => {
            if(!res.ok){
                return res.json().then(error => Promise.reject(error))
            }
        })
        .then(data => {
            this.hideUpdate()
        })
        .catch(error => {
            console.error(error)
        })
    }

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


    updateModal = () => {
        return (
            <Modal show={this.state.update}>
                <h3>
                    Update {this.state.toUpdate.name}?
                </h3>
                <form>
                <div className='form-group'>
                    <label htmlFor='comment_type'></label>
                    <TextInput
                        id='comment_type'
                        name='comment_type'
                        label='Comment Type'
                        type='text'
                        value={this.state.toUpdate.name}
                        onChange={this.handleCommentChange}
                    />
                </div>
                <div className='update'>
                    <button onClick={(e) => {this.hideUpdate(); this.updateData(e)}}>Update</button>
                </div>
                </form>
                <button onClick={this.hideUpdate}>Cancel</button>   
            </Modal>
        )
    }
  
    render(){
        const propFunctions = {
            name: this.props.name,
            showModal: this.showModal,
            hideModal: this.hideModal,
            showDelete: this.showDelete,
            hideDelete: this.hideDelete,
            show: this.state.show,
            delete: this.state.delete,
            update: this.state.update,
            formatDate: this.formatDate,
            deleteModal: this.deleteModal,
            updateDelete: this.updateDelete,
            updateModal: this.updateModal,
            updateUpdate: this.updateUpdate
        }
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
                                  <AdminComments func={propFunctions} />
                                )
                              }}
                        />
                        <Route 
                        path='/dashboard/promotions' 
                        render={(props) => {
                            return (
                                <Promotions func={propFunctions} />
                            )
                            }}
                        />
                        <Route 
                        path='/dashboard/maintenance' 
                        render={(props) => {
                            return (
                                <Maintenance func={propFunctions} />
                            )
                            }}
                        />
                        <Route 
                        path='/dashboard/property-features' 
                        render={(props) => {
                            return (
                                <PropertyFeatures func={propFunctions} />
                            )
                            }}
                        />
                        <Route 
                        path='/dashboard/property-status' 
                        render={(props) => {
                            return (
                                <PropertyStatus func={propFunctions} />
                            )
                            }}
                        />
                        <Route 
                        path='/dashboard/customer-status' 
                        render={(props) => {
                            return (
                                <CustomerStatus func={propFunctions} />
                            )
                            }}
                        />
                        <Route 
                        path='/dashboard/reminders' 
                        render={(props) => {
                            return (
                                <Reminders func={propFunctions} />
                            )
                            }}
                        />
                        <Route 
                        path='/dashboard/process' 
                        render={(props) => {
                            return (
                                <Process func={propFunctions} />
                            )
                            }}
                        />
                        <Route 
                            path='/dashboard/customer-accounts' 
                            render={(props) => {
                                return (
                                    <CustomerAccounts func={propFunctions} />
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