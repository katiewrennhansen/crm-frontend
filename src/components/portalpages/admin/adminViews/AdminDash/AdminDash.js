import React, { Component } from 'react'

class AdminDash extends Component {

    render(){
        return (
            <div className='dash-container'>
                <h3>Welcome {this.props.name}</h3>
            </div>
        )
    }
}

export default AdminDash