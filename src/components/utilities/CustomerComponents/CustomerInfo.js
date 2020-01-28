import React from 'react'
import { Link } from 'react-router-dom'
import PageviewIcon from '@material-ui/icons/Pageview';

export default function CustomerInfo(props){
    const data = props.data
    return (
        <div className="customer-info">
            <p>{data.email}</p>
            <p>{data.phone}</p>
            <h3>Address</h3>
            <address>
                <p>{data.adescription4}</p>
                <p>{`${data.adescription2}, ${data.adescription3}`}</p>
                <p>{data.adescription1}</p>
            </address>
            <h3>Additional Information</h3>
            <div className="contact-grid">
                <p>Category:</p> 
                <p>{data.category}</p>
            </div>
            <div className="contact-grid">
                <p>Status:</p>
                <p>{data.status}</p>
            </div>
            <div className="contact-grid">
                <p>Tax ID:</p>
                <p>{data.taxid}</p>
            </div>
            <div className="contact-grid">
                <p>Broker:</p>
                <p>{data.broker}</p>
            </div>
            <div className="contact-grid">
                <p>Reminder:</p>
                <p>{data.remainder}</p>
            </div>
            <div className="contact-grid">
                <p>Anniversary:</p>
                <p>{data.anniversary}</p>
            </div>
            <div className="contact-grid">
                <p>Additional Comments:</p>
                <p>{data.comment}</p>
            </div>
        
            <div className="transfers-table">
                <h3>Transfers</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.transfers.map(t => {
                            return (
                                <tr key={t.data.id}>
                                    <td>{t.data.observations}</td>
                                    <td>{t.data.totalamount}</td>
                                    <td>{t.data.trasferdate}</td>
                                    <td>
                                        <Link to={`/dashboard/customer-accounts/${props.data.id}/transfer/${t.data.id}`}>
                                            <PageviewIcon className="active-icon"/>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}