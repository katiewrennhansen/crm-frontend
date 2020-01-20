import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import BrokerNav from '../BrokerNav/BrokerNav'
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
import AddProvider from '../brokerViews/Maintenance/AddProvider'
import EditProvider from '../brokerViews/Maintenance/EditProvider'
import PromotionPage from '../brokerViews/Promotion/PromotionPage'
import ContactPage from '../brokerViews/Contacts/ContactPage'
import EditContact from '../brokerViews/Contacts/EditContact'
import AddContact from '../brokerViews/Contacts/AddContact'
import AddReminder from '../brokerViews/Reminders/AddReminder'
import CheckIn from '../../../utilities/PropertyComponents/CheckIn'
import './BrokerHome.css'


class BrokerHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            assets: [],
            singleAsset: [],
            active: false,
            highlighted: ''
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

    setHighlighted = (highlighted) => {
        this.setState({
            highlighted
        })
    }
    
    render(){
        const value = {
            assets: this.state.assets,
            singleAsset: this.state.singleAsset,
            highlighted: this.state.highlighted,
            setAssets: this.setAssets,
            setSingleAsset: this.setSingleAsset,
            active: this.state.active,
            toggleNav: this.toggleNav,
            setHighlighted: this.setHighlighted
        }
        return (
            <BrokerContext.Provider value={value}>
             <div className='dashboard-container'>
                    <div className={`${(this.state.active) ? null : 'collapsed'} dash-sidebar`}>
                        <BrokerSidebar 
                            handleTitle={this.handleTitle}                        
                        />
                    </div>
                    <div className={`${(this.state.active) ? null : 'collapsed'} dash-nav`}>
                        <BrokerNav 
                            handleTitle={this.handleTitle}   
                            title={this.state.title}
                            history={this.props.history}
                        />
                    </div>
                    <div className={`${(this.state.active) ? null : 'collapsed'} dash-home`}>
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
                                path='/broker/properties/:id' 
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
                                exact path='/broker/property/:id/edit' 
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
                                exact path='/broker/property/:id/checkin' 
                                render={(history) => {
                                    const id = history.match.params.id;
                                    return (
                                    <CheckIn 
                                        id={id}
                                        history={history}
                                    />
                                    )
                                }}
                            />
                            <Route 
                                exact path='/broker/promotions' 
                                component={Promotion}
                            />
                            <Route 
                                path='/broker/promotions/:id' 
                                render={(history) => {
                                    const id = history.match.params.id;
                                    return (
                                    <PromotionPage 
                                        id={id}
                                        history={history}
                                    />
                                    )
                                }}
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
                                exact path='/broker/reminders' 
                                component={Reminders}
                            />
                            <Route 
                                path='/broker/reminders/add' 
                                component={AddReminder}
                            />
                            <Route 
                                exact path='/broker/network' 
                                component={Network}
                            />
                            <Route 
                                exact path='/broker/contacts' 
                                component={Contacts}
                            />
                            <Route 
                                exact path='/broker/contacts/add' 
                                component={AddContact}
                            />
                            <Route 
                                exact path='/broker/contacts/:id' 
                                render={(history) => {
                                    const id = history.match.params.id;
                                    return (
                                        <ContactPage
                                            id={id}
                                            history={history}
                                        />
                                    )
                                }}
                            />
                            <Route 
                                path='/broker/contacts/:id/edit' 
                                render={(history) => {
                                    const id = history.match.params.id;
                                    return (
                                        <EditContact
                                            id={id}
                                            history={history}
                                        />
                                    )
                                }}
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