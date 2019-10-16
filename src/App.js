import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import WebpageHome from './components/webpages/WebpageHome/WebpageHome'
import AboutPage from './components/webpages/AboutPage/AboutPage'
import MainNav from './components/Headers/MainNav/MainNav'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import ForgotPassword from './components/ResetPassword/ForgotPassword/ForgotPassword'
import ChangePassword from './components/ResetPassword/ChangePassword/ChangePassword'
import ServicesPage from './components/webpages/ServicesPage/ServicesPage'
import UserRegistration from './components/RegistrationAccountTypes/UserRegistration/UserRegistration'
import SelectAccountType from './components/SelectAccountType/SelectAccountType';
import BrokerRegistration from './components/RegistrationAccountTypes/BrokerRegistration/BrokerRegistration'
import OwnerRegistration from './components/RegistrationAccountTypes/OwnerRegistration/OwnerRegistration'
import UserHome from './components/portalpages/user/UserHome/UserHome'
import './App.css'


// function AuthenticatedRoute({component: Component, authenticated, ...rest}) {
//   return (
//     <Route
//       {...rest}
//       render={(props) => authenticated === true
//           ? <Component {...props} {...rest} />
//           : <Redirect to='/login' /> }
//     />
//   )
// }


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usertype: '',
      authenticated: false
    }
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
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
    console.log(this.state)
  }



  logout(){
    console.log('logged out')
    localStorage.clear()
    this.isAuthenticated(false);
    return ( <Redirect to='/login' /> )
}

  componentWillMount(){
    const email = localStorage.getItem('email');
    console.log(email)
    if(email){
      this.setState({
        authenticated: true
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
        <MainNav authenticated={this.state.authenticated} logout={this.logout} />
        <Switch>
          <Route 
            exact path='/'
            component={WebpageHome}
          />
          <Route 
            path='/about'
            component={AboutPage}
          />
          <Route 
            path='/services'
            component={ServicesPage}
          />
          <Route 
            path='/login'
            render={(props) => {
              return (
                <Login isAuthenticated={this.isAuthenticated} handleUserType={this.handleUserType} />
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
            path='/select-account-type'
            component={SelectAccountType}
          />
          <Route 
            path='/register-user'
            component={UserRegistration}
          />
          <Route 
            path='/register-broker'
            component={BrokerRegistration}
          />
          <Route 
            path='/register-owner'
            component={OwnerRegistration}
          />
          <Route 
            path='/user-home'
            render={(props) => {
              if(this.state.authenticated && this.state.usertype === 'user') {
                return ( <UserHome /> )
              } else {
                return ( <Redirect to='/login' /> )
              }}}
          />
          {/* <Route
            path='dashboard'
            render={(props => {
              if(this.state.authenticated && this.usertype === 'admin'){
                return ( <AdminDashboard /> )
              } else {
                return ( <Redirect to='login' /> )
              }
            })}
          /> */}
        </Switch>
       <Footer />
      </div>
    );
  }
}

export default App;
