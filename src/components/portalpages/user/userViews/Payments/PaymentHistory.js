import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import PageviewIcon from '@material-ui/icons/Pageview';

class PaymentHistory extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            transfers: []
        }
    }

    setTransfers = transfers => {
        this.setState({
            transfers
        })
    }

    componentDidMount(){
        ApiService.getDataHalf(`${config.API_ENDPOINT}/customers/0/transfers`)
            .then(data => {
                this.setTransfers(data.transfers)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return (
            <div className='data-container'>
                <h3>Payment History</h3>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Bank</th>
                            <th>Account #</th>
                            <th>Amount</th>
                            <th>Transfer #</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        (this.state.transfers[0]) 
                        ? this.state.transfers.map(t => {
                                return (
                                    <tr key={t.data.id}>
                                        <td>{t.data.trasferdate}</td>
                                        <td>{t.data.bank}</td>
                                        <td>{t.data.account}</td>    
                                        <td>{t.data.totalamount}</td>
                                        <td>{(t.data.banktransaction) ? t.data.banktransaction : '-'}</td>
                                        <td>
                                            <Link to={`/user/payments/view/${t.data.id}`}>
                                                <PageviewIcon className="active-icon"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )})
                            : ( <tr>
                                    <td className="nothing-to-display">You have not submitted any transfers yet</td>
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
                <p className="entry-count">Showing {this.state.transfers.length} of {this.state.transfers.length} entries</p>
            </div>
        )
    }
}

export default PaymentHistory