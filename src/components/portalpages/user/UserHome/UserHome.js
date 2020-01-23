import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import UserNav from '../UserNav/UserNav'
import UserSidebar from '../UserSidebar/UserSidebar'
import Dashboard from '../userViews/Dashboard/Dashboard'
import UserContext from '../../../../contexts/UserContext'
import Properties from '../userViews/Properties/Properties'
import AddProperty from '../userViews/Properties/AddProperty'
import SingleProperty from '../userViews/Properties/SingleProperty'
import EditProperty from '../userViews/Properties/EditProperty'
import Maintenance from '../userViews/Maintenance/Maintenance'
import Visits from '../userViews/Visits/Visits'
import './UserHome.css'
import Payments from '../userViews/Payments/Payments'
import Contracts from '../userViews/Contracts/Contracts'
import CheckIn from '../../../utilities/PropertyComponents/CheckIn'
import Profile from '../../../utilities/CustomerComponents/Profile'


class UserHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            active: false,
            singleAsset: {}
        }
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

    setSingleAsset = (asset) => {
        this.setState({
            singleAsset: asset
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
        const value = {
            active: this.state.active,
            toggleNav: this.toggleNav,
            singleAsset: this.state.singleAsset,
            setSingleAsset: this.setSingleAsset
        }
        return (
            <UserContext.Provider value={value}>
                <div className='dashboard-container'>
                    <div className={`${(this.state.active) ? null : 'collapsed'} dash-sidebar`}>
                        <UserSidebar 
                            handleTitle={this.handleTitle}                        
                        />
                    </div>
                    <div className={`${(this.state.active) ? null : 'collapsed'} dash-nav`}>
                        <UserNav 
                            handleTitle={this.handleTitle}   
                            title={this.state.title}
                            history={this.props.history}
                        />
                    </div>
                    <div className={`${(this.state.active) ? null : 'collapsed'} dash-home`}>
                        <Switch>
                            <Route 
                                exact path='/user' 
                                component={Dashboard}
                            />
                            <Route 
                                exact path='/user/account-settings' 
                                component={Profile}
                            />
                            <Route 
                                exact path='/user/properties' 
                                component={Properties}
                            />
                            <Route 
                                exact path='/user/properties/add' 
                                component={AddProperty}
                            />
                            <Route 
                                path='/user/properties/:id' 
                                render={(history) => {
                                    const id = history.match.params.id;
                                    return (
                                    <SingleProperty 
                                        id={id}
                                    />
                                    )
                                }}
                            />
                            <Route 
                                exact path='/user/property/:id/edit' 
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
                                exact path='/user/property/:id/documents' 
                                render={(history) => {
                                    const id = history.match.params.id;
                                    return (
                                    <CheckIn 
                                        id={id}
                                        history={history}
                                        usertype="user"
                                    />
                                    )
                                }}
                            />
                            <Route 
                                exact path='/user/maintenance' 
                                component={Maintenance}
                            />
                            <Route 
                                exact path='/user/visit-requests' 
                                component={Visits}
                            />
                            <Route 
                                path='/user/payments'
                                component={Payments}
                            />
                            <Route 
                                path='/user/contracts'
                                component={Contracts}
                            />    
                        </Switch>
                    </div>
                </div>
            </UserContext.Provider>
        )
    }
}

export default withRouter(UserHome)