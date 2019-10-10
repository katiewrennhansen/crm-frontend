import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
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
// import RegistrationForm from './components/RegistrationAccountTypes/RegistrationForm/RegistrationFrom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usertype: ''
    }
  }

  handleUserType = (user) => {
    this.setState({
      usertype: user
    })
    console.log(this.state.usertype)
  }

  render() {
    return (
      <div className="App">
        <MainNav />
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
            component={Login}
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
            // render={() => {
            //   return (
            //   <SelectAccountType handleUserType={this.handleUserType} />
            //   )
            // }}
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
          {/* <Route 
            path='/register' 
            render={() => {
              return (
              <RegistrationForm usertype={this.state.usertype} />
              )
            }}
          /> */}
          <Route 
            path='/user-home'
            component={UserHome}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
