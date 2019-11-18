import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import AdminNav from '../../admin/AdminNav/AdminNav'
import BrokerSidebar from '../BrokerSidebar/BrokerSidebar'

class BrokerHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
        }
    }
    
    render(){
        return (
            <>
             <div className='dashboard-container'>
                    <div className='dash-sidebar'>
                        <BrokerSidebar />
                    </div>
                    <div className='dash-nav'>
                        <AdminNav />
                    </div>
                    <div className='dash-home'>
                        <div>Broker Home</div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(BrokerHome)