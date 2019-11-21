import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import WebpageHome from './components/webpages/WebpageHome/WebpageHome'
import AboutPage from './components/webpages/AboutPage/AboutPage'
import ServicesPage from './components/webpages/ServicesPage/ServicesPage'
import SearchPage from './components/webpages/SearchPage/SearchPage'
import Contact from './components/webpages/Contact/Contact'
import Login from './components/Login/Login'
import ForgotPassword from './components/ResetPassword/ForgotPassword/ForgotPassword'
import ChangePassword from './components/ResetPassword/ChangePassword/ChangePassword'
import UserRegistration from './components/RegistrationAccountTypes/UserRegistration/UserRegistration'
import UserHome from './components/portalpages/user/UserHome/UserHome'
import AdminHome from './components/portalpages/admin/AdminHome/AdminHome'
import BrokerHome from './components/portalpages/broker/BrokerHome/BrokerHome'
import PrivateRoute from './components/utilities/PrivateRoute'
import PublicRoute from './components/utilities/PublicRoute'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usertype: '',
      authenticated: false,
    }
  }

  handleUserType = (user) => {
    this.setState({
      usertype: user
    })
  }

  render() {
      return (
        <div className="App">
          <Switch>
  {/* ******** MAIN WEBPAGE ROUTES ******* */}
            <Route
                exact path='/'
                render={(props) => {
                  return (
                    <WebpageHome
                      logout={this.logout} 
                    />
                  )
                }}
              />
              <Route
                exact path='/about'
                render={(props) => {
                  return (
                    <AboutPage
                      logout={this.logout} 
                    />
                  )
                }}
              />
              <Route
                exact path='/services'
                render={(props) => {
                  return (
                    <ServicesPage
                      logout={this.logout} 
                    />
                  )
                }}
              />
              <Route
                exact path='/search'
                render={(props) => {
                  return (
                    <SearchPage
                      logout={this.logout} 
                    />
                  )
                }}
              />
              <Route
                exact path='/contact'
                render={(props) => {
                  return (
                    <Contact
                      logout={this.logout} 
                    />
                  )
                }}
              />

    {/* ******** LOGIN AND AUTH ROUTES ******* */}
            <Route 
              path='/login'
              render={(props) => {
                return (
                  <Login 
                    history={props.history}
                    handleUserType={this.handleUserType} 
                  />
                )
              }}
            />
            <PublicRoute 
              path='/forgot-password'
              component={ForgotPassword}
            />
            <PublicRoute 
              path='/change-password'
              component={ChangePassword}
            />
            <PublicRoute 
              path='/register'
              component={UserRegistration}
            />

    {/* ******** USER PORTAL ROUTES ******* */}
            <Route 
              path='/user-home'
              render={(props) => {
                if(this.state.usertype === 'user') {
                  return ( 
                  <UserHome 
                    authenticated={this.state.authenticated}
                    logout={this.logout}
                  />
                  )
                } else {
                  return ( <Redirect to='/login' /> )
                }}}
            />
    {/* ******** ADMIN PORTAL ROUTES ******* */}
          {(this.state.usertype === 'admin')
            ? (<PrivateRoute 
              to='/dashboard'
              component={AdminHome}
              />
            ) : null
          })}
            <PrivateRoute 
              to='/dashboard'
              component={AdminHome}
            />
            <Route 
              path='/broker'
              component={BrokerHome}
            />
          </Switch>
        </div>
      );
    }
}

export default withRouter(App);

