import React, { Component } from 'react'

class Dashboard extends Component {

    render(){
        return (
            <div className='admin-dashboard'>
                <div className='dash-container'>
                    <h3>Welcome {this.props.name}</h3>
                </div>
                
            </div>
        )
    }
}

export default Dashboard