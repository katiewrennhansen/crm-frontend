import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service';

class CustomerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: []
        };
    }

    setCustomer = customer => {
        this.setState({
            customer: customer,
            error: null
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/customers`
        ApiService.getById(endpoint, this.props.id)
            .then(data => {
                this.setCustomer(data.data)
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    componentWillUnmount(){
        this.setCustomer([])
    }
    
    render(){  
        const data = this.state.customer
        return (
            <>
                <div className='container'>
                    <div className='header-grid'>
                        <h3>{data.name}</h3>
                        <Link to={`/broker/contacts/${data.id}/edit`} className='btn'>Edit Customer</Link>
                    </div>
                    <div>
                        <p>{data.email}</p>
                        <br></br>
                        <p>{data.adescription4}</p>
                        <p>{`${data.adescription2}, ${data.adescription3}`}</p>
                        <p>{data.adescription1}</p>
                        <br></br>
                        <p>Category: {data.category}</p>
                        <p>Status: {data.status}</p>
                        <p>Tax ID: {data.taxid}</p>
                        <p>Broker: {data.broker}</p>
                        <p>Reminder: {data.remainder}</p>
                    </div>
                </div>
            </>
        )
    }
}

export default CustomerPage