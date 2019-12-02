import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import AdminNav from '../../admin/AdminNav/AdminNav'
import BrokerSidebar from '../BrokerSidebar/BrokerSidebar'
import Dashboard from '../brokerViews/Dashboard/Dashboard'
import Properties from '../brokerViews/Properties/Properties'
import Promotion from '../brokerViews/Promotion/Promotion'
import Maintenance from '../brokerViews/Maintenance/Maintenance'
import Reminders from '../brokerViews/Reminders/Reminders'
import Network from '../brokerViews/Network/Network'
import Contacts from '../brokerViews/Contacts/Contacts'
import Provider from '../brokerViews/Maintenance/Provider'
import Alerts from '../brokerViews/Alerts/Alerts'
import SinglePropertyPage from '../brokerViews/Properties/SinglePropertyPage'
import BrokerContext from '../../../../contexts/BrokerContext'
import EditProperty from '../brokerViews/Properties/EditProperty'
import AddProperty from '../brokerViews/Properties/AddProperty'
import './BrokerHome.css'
import AddProvider from '../brokerViews/Maintenance/AddProvider'
import EditProvider from '../brokerViews/Maintenance/EditProvider'


class BrokerHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            assets: [],
            singleAsset: []
        }
    }

    setAssets = (assets) => {
        this.setState({
            assets: assets
        })
    }

    setSingleAsset = (asset) => {
        this.setState({
            singleAsset: asset
        })
    }

    handleTitle = (title) => {
        this.setState({
            title: title
        })
    }
    
    render(){
        const value = {
            assets: this.state.assets,
            singleAsset: this.state.singleAsset,
            setAssets: this.setAssets,
            setSingleAsset: this.setSingleAsset
        }
        return (
            <BrokerContext.Provider value={value}>
             <div className='dashboard-container'>
                    <div className='dash-sidebar'>
                        <BrokerSidebar 
                            handleTitle={this.handleTitle}                        
                        />
                    </div>
                    <div className='dash-nav'>
                        <AdminNav 
                            handleTitle={this.handleTitle}   
                            title={this.state.title}
                        />
                    </div>
                    <div className='dash-home'>
                        <Switch>
                            <Route 
                                exact path='/broker' 
                                component={Dashboard}
                            />
                            <Route 
                                exact path='/broker/properties' 
                                component={Properties}
                            />
                            <Route 
                                exact path='/broker/properties/add' 
                                component={AddProperty}
                            />
                            <Route 
                                exact path='/broker/properties/:id' 
                                render={(history) => {
                                    const id = history.match.params.id;
                                    return (
                                    <SinglePropertyPage 
                                        id={id}
                                    />
                                    )
                                }}
                            />
                            <Route 
                                path='/broker/properties/:id/edit' 
                                render={(history) => {
                                    const id = history.match.params.id;
                                    return (
                                    <EditProperty 
                                        id={id}
                                        history={history}
                                    />
                                    )
                                }}
                            />
                            <Route 
                                path='/broker/promotions' 
                                component={Promotion}
                            />
                            <Route 
                                exact path='/broker/maintenance' 
                                component={Maintenance}
                            />
                            <Route 
                                exact path='/broker/maintenance/add-provider' 
                                component={AddProvider}
                            />
                            <Route 
                                exact path='/broker/maintenance/:id' 
                                render={(history) => {
                                    const id = history.match.params.id;
                                    return (
                                        <Provider 
                                            id={id}
                                        />
                                    )
                                }}
                            />
                            <Route 
                                exact path='/broker/maintenance/:id/edit' 
                                render={(history) => {
                                    const id = history.match.params.id;
                                    return (
                                        <EditProvider
                                            id={id}
                                            history={history}
                                        />
                                    )
                                }}
                            />
                            <Route 
                                path='/broker/reminders' 
                                component={Reminders}
                            />
                            <Route 
                                path='/broker/network' 
                                component={Network}
                            />
                            <Route 
                                path='/broker/contacts' 
                                component={Contacts}
                            />
                            <Route 
                                path='/broker/alerts' 
                                component={Alerts}
                            />
                        </Switch>
                    </div>
                </div>
            </BrokerContext.Provider>
        )
    }
}

export default withRouter(BrokerHome)