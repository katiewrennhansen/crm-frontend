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
        this.handleCommentChange = this.handleCommentChange.bind(this);
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
    }

    formatPriceUSD = (amount) => {
        const thousands = ","
        let i = parseInt(amount = Math.abs(Number(amount) || 0)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;
        return "$" + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands);
    }

    fetchData = (endpoint, cb) => {
        fetch(endpoint, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
        })
        .then(data => {
            cb(data)
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    deleteModal = (endpoint, removeFn) => {
        return (
            <Modal show={this.state.delete}>
                <div className='delete-modal-grid'>
                    <h3>Are you sure you would like to delete {this.state.toDelete.name}?</h3>
                    <div className='cancel'>                    
                        <button onClick={this.hideDelete}>Cancel</button>
                    </div>
                    <div className='delete'>
                        <button onClick={() => deleteData(endpoint, this.state.toDelete.id, removeFn)}>Delete</button>
                    </div>
                </div>
            </Modal>
        )
    }


    updateModal = () => {
        return (
            <Modal className='update-modal' show={this.state.update}>
                <div className='update-modal-grid'>
                    <h3>Update {this.state.toUpdate.name}?</h3>
                    <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                        <div className='form-group'>
                            <label htmlFor='comment_type'></label>
                            <TextInput
                                id='comment_type'
                                name='update'
                                label='Comment Type'
                                type='text'
                                value={this.state.updatedContent}
                                onChange={(e) => this.handleCommentChange(e)}
                            />
                        </div>
                        <div className='update'>
                            <button type='submit'>Update</button>
                        </div>
                    </form>
                    <div className='cancel'>
                        <button onClick={this.hideUpdate}>Cancel</button>   
                    </div>
                </div>
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
            deleteModal: this.deleteModal,
            updateDelete: this.updateDelete,
            updateModal: this.updateModal,
            updateUpdate: this.updateUpdate,
            fetchData: this.fetchData,
            showUpdate: this.showUpdate,
            hideUpdate: this.hideUpdate,
            updateContent: this.state.toUpdate
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
                        path='/dashboard/asset-type' 
                        render={(props) => {
                            return (
                                <AssetType func={propFunctions} />
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
        )
    }
}

export default withRouter(AdminHome)