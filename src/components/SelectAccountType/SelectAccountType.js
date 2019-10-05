import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './SelectAccountType.css'


class SelectAccountType extends Component {
    render(){
        return (
            <div className='account-type-container'>
                <div className='account-type-button-container'>
                    <h2>Select Account Type</h2>
                    <Link to='/register-user' style={{ textDecoration: 'none'}}>
                        <button className='account-type-button'>Buyer</button>
                    </Link>
                    <Link to='/register-broker' style={{ textDecoration: 'none'}}>
                        <button className='account-type-button'>Broker</button>
                    </Link>
                    <Link to='/register-owner' style={{ textDecoration: 'none'}}>
                        <button className='account-type-button'>Owner</button>
                    </Link>
                </div>
            </div>

        )
    }
}

export default SelectAccountType