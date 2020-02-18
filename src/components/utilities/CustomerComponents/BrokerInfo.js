import React from 'react'

export default function BrokerInfo(props){
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
                    <p>{data.email}</p>
                    <p>{data.secondemail}</p>
                    <p>{data.phone}</p>
                    <address>
                        <p>{data.adescription1}</p>
                        <p>{`${data.adescription2}, ${data.adescription3}`}</p>
                        <p>{data.adescription4}, {data.adescription5}</p>
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
                <p>Tax ID:</p>
                <p>{data.taxid}</p>
            </div>
            <div className="contact-grid">
                <p>Additional Comments:</p>
                <p>{data.comment}</p>
            </div>
        </div>
    )
}