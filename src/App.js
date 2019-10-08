import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import WebpageHome from './components/WebpageHome/WebpageHome'
import AboutPage from './components/AboutPage/AboutPage'
import MainNav from './components/Headers/MainNav/MainNav'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import ServicesPage from './components/ServicesPage/ServicesPage'
import UserRegistration from './components/RegistrationAccountTypes/UserRegistration/UserRegistration'
import SelectAccountType from './components/SelectAccountType/SelectAccountType';
import BrokerRegistration from './components/RegistrationAccountTypes/BrokerRegistration/BrokerRegistration'
import OwnerRegistration from './components/RegistrationAccountTypes/OwnerRegistration/OwnerRegistration'
import './App.css'

class App extends Component {
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
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
