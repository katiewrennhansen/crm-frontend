import React, { Component } from 'react'

class Dashboard extends Component {

    render(){
        return (
            <div className='admin-dashboard'>
                <div className='dash-container'>
                    <h2>Welcome {this.props.name}</h2>
                </div>
                
            </div>
        )
    }
}

export default Dashboard