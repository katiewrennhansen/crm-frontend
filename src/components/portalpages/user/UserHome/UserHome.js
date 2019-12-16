import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import UserNav from '../UserNav/UserNav'
import UserSidebar from '../UserSidebar/UserSidebar'
import Dashboard from '../userViews/Dashboard/Dashboard'
import UserContext from '../../../../contexts/UserContext'

class UserHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            active: false
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
            toggleNav: this.toggleNav
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
                                exact path='/user-home' 
                                component={Dashboard}
                            />
                        </Switch>
                    </div>
                </div>
            </UserContext.Provider>
        )
    }
}

export default withRouter(UserHome)