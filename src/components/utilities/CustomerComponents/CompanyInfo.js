import React from 'react'

export default function CompanyInfo(props){
    const data = props.data
    return (
        <div className="customer-info">
            <h4>{data.contact}</h4>
            <p>{data.email}</p>
            <p>{data.phone}</p>
            <h3>Address</h3>
            <address>
                <p>{data.adescription1}</p>
                <p>{`${data.adescription2}, ${data.adescription3}`}</p>
                <p>{data.adescription4}</p>
                <p>{data.adescription5}</p>
            </address>
            <h3>Additional Information</h3>
            <div className="contact-grid">
                <p>Tax ID:</p>
                <p>{data.ctax_id}</p>
            </div>
            <div className="contact-grid">
                <p>Portals:</p>
                <p>{data.portals}</p>
            </div>
        </div>
    )
}