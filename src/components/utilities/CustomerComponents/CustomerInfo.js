import React from 'react'
import { Link } from 'react-router-dom'
import PageviewIcon from '@material-ui/icons/Pageview';

export default function CustomerInfo(props){
    const data = props.data
    return (
        <div className="customer-info">
            <div className="customer-info-flex">
                {(data.photo_url)
                    ? <img className="customer-image" src={data.photo_url} alt="customer profile"/>
                    : <div className="default-image">
                        <span role="img" aria-label="camera icon">📷</span>
                        <p className="nothing-to-display">No photo to display</p>
                    </div>
                }                
                <div>
                <div className="contact-grid">
                <p>Type: {data.ctype}</p> 
            </div>
                    <p>{data.email}</p>
                    <p>{data.phone}</p>
                    <address>
                        <p>{data.adescription1}</p>
                        <p>{`${data.adescription2}, ${data.adescription3}`}</p>
                        <p>{data.adescription4}, {data.country}</p>
                    </address>
                </div>
            </div>

            <h3>Bank Information</h3>
            {(data.bankaccount) 
                ? <>
                    <div className="contact-grid">
                        <p>Bank:</p>
                        <p>{data.bank}</p>
                    </div>
                    <div className="contact-grid">
                        <p>Bank Code:</p>
                        <p>{data.bankcode}</p>
                    </div>
                    <div className="contact-grid">
                        <p>Bank Account:</p>
                        <p>{data.bankaccount}</p>
                    </div>
                </>
                : <div className="contact-grid">
                    <p className="nothing-to-display">No bank information to display</p>
                </div>
            }
            
            <h3>Additional Information</h3>
            <div className="contact-grid">
                <p>Title:</p> 
                <p>{data.title}</p>
            </div>
            <div className="contact-grid">
                <p>Profession:</p> 
                <p>{data.profession}</p>
            </div>
            <div className="contact-grid">
                <p>Marital:</p> 
                <p>{data.marital}</p>
            </div>
            <div className="contact-grid">
                <p>Gender:</p> 
                <p>{data.gender}</p>
            </div>
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
        
            <div className="assets-table">
                <h3>Properties</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Broker</th>
                            <th>Tenant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(props.data.assets)
                        ? props.data.assets.map(a => {
                            return (
                                <tr key={a.id}>
                                    <td>{(a.adescription1)+(', ')}
                                        {a.adescription2}</td>
                                    <td>{a.status}</td>
                                    <td>{a.broker}</td>
                                    <td>{a.tenant}</td>
                                </tr>
                            )
                        })
                        : <tr>
                            <td className="nothing-to-display">No assets to display</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        }
                    </tbody>
                </table>
            </div>

            <div className="transfers-table">
                <h3>Transfers</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Observations</th>
                            <th>Transfer #</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(props.transfers[0])
                        ? props.transfers.map(t => {
                            return (
                                <tr key={t.data.id}>
                                    <td>{t.data.observations}</td>
                                    <td>{(t.data.banktransaction) ? t.data.banktransaction : '-'}</td>
                                    <td>{t.data.totalamount}</td>
                                    <td>{t.data.trasferdate}</td>
                                    <td>
                                        <Link to={`/${props.url}/${props.data.id}/transfer/${t.data.id}`}>
                                            <PageviewIcon className="active-icon"/>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                        : <tr>
                            <td className="nothing-to-display">No transfers to display</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}