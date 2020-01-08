import React, { Component } from 'react'

class PaymentAccounts extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            accounts: []
        }
    }
    render(){
        return (
            <div className='data-container'>
                <h3>Payment Accounts</h3>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Cardholder Name</th>
                            <th>Card Number</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        (this.state.accounts[0]) 
                        ?
                            this.state.accounts.map(c => {
                                return (
                                    <tr key={c.id}>
                                        <td>Date Issued</td>
                                        <td>Name</td>
                                        {/* <td>{(c.confirmatindate) ? `Completed ${c.requestdate}` : 'Pending'}</td>  */}
                                        <td>Status</td>
                                        <td className="action-icon">Delete</td>                                       
                                    </tr>
                                )})
                            : ( <tr>
                                    <td>You have not set up any payment accounts</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr> )
                        }
                    </tbody>
                </table>
                <br></br>
                <p className="entry-count">Showing {this.state.accounts.length} of {this.state.accounts.length} entries</p>
            </div>
        )
    }
}

export default PaymentAccounts