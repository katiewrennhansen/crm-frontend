import React, { Component } from 'react'
import Moment from 'react-moment'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'

const promotionsEndpoint = config.PROMOTIONS_ENDPOINT

class Promotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: null,
        };
    }

    setData = (data) => {
        const promotions = data.promotions
        this.setState({
            data: promotions
        })
    }

    componentDidMount(){
        ApiService.getData(
            promotionsEndpoint,
            this.setData
        )
    }

    render(){
        console.log(this.state.data)
        return (
            <div className='data-container'>
            <h3>Promotions</h3>
            <button className='add-data' 
            // onClick={context.showModal}
            >Add Promotion</button>
            <table className='data-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Total Cost</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map(p => (
                    <tr key={p.data.id}>
                        <td>{p.data.typepromotion}</td>
                        <td>
                            <Moment format="YYYY/MM/DD">{p.data.startdate}</Moment>
                        </td>
                        <td>
                            <Moment format="YYYY/MM/DD">{p.data.duedate}</Moment>
                        </td>
                        <td>{p.data.totalcost}</td>
                        <td className='update'>
                            <button>Assign to User</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )
    }
}

export default Promotion