import React, {Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../services/api-service'
import config from '../../../config'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


class Transfers extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            transfer: [],
            transactions: [],
            total: ''
        }
    }

    setTransfer = transfer => {
        this.setState({
            transfer
        })
    }

    setTransactions = transactions => {
        this.setState({
            transactions
        })
    }
    

    setTotal = arr => {
        let total = 0
        arr.map(a => total += Number(a.data.amount2))
        this.setState({
            total
        })
    }

    componentDidMount(){
        const rootUrl = `${config.API_ENDPOINT}/customers/${this.props.id}/transfers/${this.props.transId}`
        ApiService.getDataHalf(rootUrl)
            .then(data => {
                this.setTransfer(data.data)
            })
            .catch(error => console.log(error))
        ApiService.getDataHalf(`${rootUrl}/transactions`)
            .then(data => {
                this.setTransactions(data.transactions)
                this.setTotal(data.transactions)
            })
            .catch(error => console.log(error))
    }

    render() {
        const trans = this.state.transfer
        return (
            <div className="contact-container">
                <Link to={`/${this.props.url}/${this.props.id}`}>Back</Link>
                <h2>Transfer #{trans.transfernumber}</h2>
                <div>
                    <p>Customer Name: {trans.customer}</p>
                    <p>Bank: {trans.bank}</p>
                    <p>Account#: {trans.account}</p>
                    <p>Date: {trans.trasferdate}</p>
                    <p>Observations: {trans.observations}</p>
                </div>
                <div className="transactions-table">
                    <h3>Transactions</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Property</th>
                                <th>Concept</th>
                                <th>Comment</th>
                                <th>Kind</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>View Receipt</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.transactions.map(t => {
                            const receipt = t.data.receipt_url
                            return (
                                <tr key={t.data.id}>
                                    <td>{t.data.adescription1}</td>
                                    <td>{t.data.concept}</td>
                                    <td>{t.data.comment}</td>
                                    <td>{t.data.kind}</td>
                                    <td>{t.data.amount}</td>
                                    <td>{t.data.date}</td>
                                    <td>
                                    {(receipt)
                                        ? <a href={Object.values(receipt)[0].receipt} target="_blank" rel="noopener noreferrer" className="active-icon">
                                            <InsertDriveFileIcon />
                                        </a>
                                        : null
                                    }
                                    </td>
                                    <td><DeleteOutlineIcon className='delete-btn'/></td>
                                </tr>
                                )
                            })}
                            {(this.state.transactions[0])
                       ? 
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><strong>Total</strong></td>
                                <td>${this.state.transactions.reduce((a,b) => a + Number(b.data.amount2), 0)}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            : null
                            }
                        </tbody>
                    </table>
                    <p className="entry-count">Showing {this.state.transactions.length} of {this.state.transactions.length} entries</p>
                </div>
            </div>
        )
    }
}

export default Transfers