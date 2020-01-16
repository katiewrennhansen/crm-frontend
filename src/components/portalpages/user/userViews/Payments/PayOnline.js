import React, { Component } from 'react'

class PayOnline extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            payments: [],
            currentBalance: 0
        }
    }
    render(){
        return (
            <div  className='data-container'>
                <h3>Pay Online</h3>
                <h4>Current Balance: ${this.state.currentBalance}</h4>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Charge</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        (this.state.payments[0]) 
                        ?
                            this.state.payments.map(c => {
                                return (
                                    <tr key={c.id}>
                                        <td>Date Issued</td>
                                        <td>Name</td>
                                        {/* <td>{(c.confirmatindate) ? `Completed ${c.requestdate}` : 'Pending'}</td>  */}
                                        <td>Status</td>
                                        <td className="action-icon">View</td>                                       
                                    </tr>
                                )})
                            : ( <tr>
                                    <td className="nothing-to-display">No Current Charges to Display</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr> )
                        }
                    </tbody>
                </table>
                <br></br>
                <p className="entry-count">Showing {this.state.payments.length} of {this.state.payments.length} entries</p>
            </div>
        )
    }
}

export default PayOnline