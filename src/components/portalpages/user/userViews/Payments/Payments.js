import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import PayOnline from './PayOnline'
import PaymentHistory from './PaymentHistory'
import PaymentAccounts from './PaymentAccounts'

class Payments extends Component {
    render(){
        return (
            <>
                <nav className="payments-nav">
                    <Link to='/user/payments'>Pay Online</Link>
                    <Link to='/user/payments/history'>Payment History</Link>
                    <Link to='/user/payments/accounts'>Payment Account</Link>
                </nav>
                <div>
                    <Route  
                        exact path='/user/payments'
                        component={PayOnline}
                    />
                    <Route  
                        exact path='/user/payments/history'
                        component={PaymentHistory}
                    />
                    <Route  
                        exact path='/user/payments/accounts'
                        component={PaymentAccounts}
                    />
                </div>
            </>
        )
    }
}

export default Payments