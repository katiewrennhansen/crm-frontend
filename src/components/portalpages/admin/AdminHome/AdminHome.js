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
import EditSettings from '../adminViews/CompanySetUp/EditSettings'
import Process from '../adminViews/Process/Process'
import ProcessSteps from '../adminViews/Process/ProcessSteps'
import CustomerAccounts from '../adminViews/CustomerAccounts/CustomerAccounts'
import CustomerPage from '../adminViews/CustomerAccounts/CustomerPage'
import CompanySetUp from '../adminViews/CompanySetUp/CompanySetUp'
import AssetType from '../adminViews/AssetType/AssetType'
import AddCustomer from '../adminViews/CustomerAccounts/AddCustomer'
import Categories from '../adminViews/Categories/Categories'
import AdminContext from '../../../../contexts/AdminContext'
import EditCustomer from '../adminViews/CustomerAccounts/EditCustomer'
import Transactions from '../adminViews/Transactions/Transactions'
import './AdminHome.css'
import Transfers from '../../../utilities/CustomerComponents/Transfers'
import Banks from '../adminViews/Banks/Banks'

class AdminHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            show: false,
            delete: false,
            update: false,
            data: [],
            promotions: [],
            process: [],
            error: null,
            toUpdate: {
                name: '',
                id: ''
            },
            toDelete: {
                name: '',
                id: ''
            },
            active: false
        }
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

    updateUpdate = (name, id) => {
        this.showUpdate();
        this.setState({ 
            toUpdate: {
                name: name,
                id: id
            } 
        }); 
    };

    updateDelete = (name, id) => {
        this.showDelete();
        this.setState({ 
            toDelete: {
                name: name,
                id: id
            } 
        }); 
    };

    setData = data => {
        this.setState({
            data: data
        })
    }

    updateData = newData => {
        this.setState({
            data: [...this.state.data, newData],
            error: null
        })
    }
    
    setPromotions = data => {
        this.setState({
            promotions: data.promotions,
            error: null
        })
    }
    
    updatePromotions = data => {
        this.setState({
            promotions: [...this.state.promotions, data],
            error: null
        })
    }

    deleteData = (id) => {
        const newData = this.state.data.filter(d => {
            return d.id !== id
        })
        this.setState({
            data: newData
        })
    }

    deletePromotions = (id) => {
        const newPromotions = this.state.promotions.filter(d => {
            return d.data.id !== id
        })
        this.setState({
            promotions: newPromotions
        })
    }

    deleteProcess = (id) => {
        const newProcess = this.state.process.filter(d => {
            return d.data.id !== id
        })
        this.setState({
            process: newProcess
        })
    }

    setProcess = data => {
        const process = data.processts        
        this.setState({
            process: process,
            error: null
        })
    }

    handleTitle = (title) => {
        this.setState({
            title: title
        })
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


    formatPriceUSD = (amount) => {
        const thousands = ","
        let i = parseInt(amount = Math.abs(Number(amount) || 0)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;
        return "$" + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands);
    }


     setActive = () => {
        this.setState({
            active: true
        })
    }

    setCollapsed = () => {
        this.setState({
            active: false
        })
    }

    toggleNav = () => {
        if(this.state.active === false){
            this.setActive() 
        } else {
            this.setCollapsed()
        }
    }
  
    render(){
        const propFunctions = {
            name: this.props.name,
            history: this.props.history
        }
        const value = {
            show: this.state.show,
            delete: this.state.delete,
            update: this.state.update,
            data: this.state.data,
            promotions: this.state.promotions,
            process: this.state.process,
            name: this.state.toUpdate.name,
            id: this.state.toUpdate.id,
            nameDelete: this.state.toDelete.name,
            idDelete: this.state.toDelete.id,
            showModal: this.showModal,
            hideModal: this.hideModal,
            showDelete: this.showDelete,
            hideDelete: this.hideDelete,
            showUpdate: this.showUpdate,
            hideUpdate: this.hideUpdate,
            updateUpdate: this.updateUpdate,
            updateDelete: this.updateDelete,
            setData: this.setData,
            updateData: this.updateData,
            setPromotions: this.setPromotions,
            updatePromotions: this.updatePromotions,
            setProcess: this.setProcess,
            deleteData: this.deleteData,
            deletePromotions: this.deletePromotions,
            deleteProcess: this.deleteProcess,
            active: this.state.active,
            setActive: this.active,
            toggleNav: this.toggleNav
        }
        return (
            <AdminContext.Provider value={value}>
                <div className='dashboard-container'>
                    <div className={`${(this.state.active) ? null : 'collapsed'} dash-sidebar`}>
                        <AdminSidebar 
                            handleTitle={this.handleTitle}
                        />
                    </div>
                    <div className={`${(this.state.active) ? null : 'collapsed'} dash-nav`}>
                        <AdminNav 
                            title={this.state.title}
                            handleTitle={this.handleTitle}
                            history={this.props.history}
                        />
                    </div>
                    <div className={`${(this.state.active) ? null : 'collapsed'} dash-home`}>
                        <Switch>
                            <Route 
                                exact path='/dashboard' 
                                render={(props) => {
                                    return (
                                        <AdminDash name={this.props.name} />
                                    )
                                }}
                            />
                            <Route 
                                exact path='/dashboard/company-setup' 
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
                                path='/dashboard/categories' 
                                render={(props) => {
                                    return (
                                        <Categories />
                                    )
                                }}
                            />
                            <Route 
                                path='/dashboard/transactions' 
                                render={(props) => {
                                    return (
                                        <Transactions />
                                    )
                                }}
                            />
                            <Route 
                                path='/dashboard/banks' 
                                render={(props) => {
                                    return (
                                        <Banks />
                                    )
                                }}
                            />
                            <Route 
                            path='/dashboard/promotions' 
                            render={(props) => {
                                return (
                                    <Promotions 
                                        formatPrice={this.formatPriceUSD} 
                                    />
                                )
                                }}
                            />
                            <Route 
                            exact path='/dashboard/maintenance' 
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
                                    <Process />
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
                                exact path='/dashboard/add-customer' 
                                render={(props) => {
                                    return (
                                        <AddCustomer func={propFunctions} />
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
                            <Route 
                                exact path='/dashboard/customer-accounts/:id/edit' 
                                render={(history) => {
                                    const id = history.match.params.id;
                                    return (
                                        <EditCustomer 
                                            func={propFunctions} 
                                            id={id}
                                        />
                                    )
                                    }}
                            />
                            <Route 
                                exact path='/dashboard/customer-accounts/:id/transfer/:trans_id' 
                                render={(history) => {
                                    const id = history.match.params.id;
                                    const transId = history.match.params.trans_id;
                                    return (
                                        <Transfers 
                                            history={history} 
                                            id={id}
                                            transId={transId}
                                        />
                                    )
                                    }}
                            />
                            <Route path='/dashboard/edit-account-settings' component={EditSettings} />                        
                        </Switch>
                    </div>
                </div>
            </AdminContext.Provider>
        )
    }
}

export default withRouter(AdminHome)