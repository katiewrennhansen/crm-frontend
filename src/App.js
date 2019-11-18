import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
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
import './App.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usertype: '',
      authenticated: false,
      email: ''
    }
    this.isAuthenticated = this.isAuthenticated.bind(this)
    // this.componentDidMount = this.componentDidMount.bind(this)
    this.logout = this.logout.bind(this)
  }

  handleUserType = (user) => {
    this.setState({
      usertype: user
    })
    console.log(this.state.usertype)
  }

  isAuthenticated = (value) => {
    this.setState({
      authenticated: value
    })
  }

  logout(){
    console.log('logged out');
    localStorage.clear()
    this.isAuthenticated(false);
    return ( <Redirect to='/login' /> )
}

 componentWillMount(){
    const email = localStorage.getItem('email');
    const usertype = localStorage.getItem('usertype');
    console.log(email)
    if(email){
      this.setState({
        authenticated: true,
        usertype: usertype,
        email: email
      })
    } else {
      this.setState({
        authenticated: false
      })
    }
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
                    authenticated={this.state.authenticated} 
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
                    authenticated={this.state.authenticated} 
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
                    authenticated={this.state.authenticated} 
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
                    authenticated={this.state.authenticated} 
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
                    authenticated={this.state.authenticated} 
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
                  isAuthenticated={this.isAuthenticated} 
                  handleUserType={this.handleUserType} 
                />
              )
            }}
          />
          <Route 
            path='/forgot-password'
            component={ForgotPassword}
          />
          <Route 
            path='/change-password'
            component={ChangePassword}
          />
          <Route 
            path='/register'
            component={UserRegistration}
          />

{/* ******** USER PORTAL ROUTES ******* */}
          <Route 
            path='/user-home'
            render={(props) => {
              if(this.state.authenticated && this.state.usertype === 'user') {
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
          <Route 
            path='/dashboard'
            render={(props) => {
              if(this.state.authenticated && this.state.usertype === 'admin') {
                return ( 
                <AdminHome 
                  authenticated={this.state.authenticated}
                  logout={this.logout}
                  name={this.state.email}
                />
                )
              } else {
                return ( <Redirect to='/login' /> )
              }}}
          />
          <Route 
            path='/broker-home'
            component={BrokerHome}
          />
        </Switch>
      </div>
    );
  }
}

export default App;

