import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const promotionsEndpoint = config.PROMOTIONS_ENDPOINT
const assignPromsEndpoint = config.ASSIGN_PROMOTIONS_ENDPOINT

class Promotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: null,
            assign: false,
            id: '',
            name: '',
            users: [],
            user: ''
        };
    }

    setData = (data) => {
        const promotions = data.promotions
        this.setState({
            data: promotions
        })
    }

    setUsers = (users) => {
        const newUsers = users.customers
        this.setState({
            users: newUsers
        })
    }

    setAssign = (bool, id, name) => {
        this.setState({
            assign: bool,
            id: id,
            name: name
        })
    }

    componentDidMount(){
        ApiService.getData(
            promotionsEndpoint,
            this.setData
        )
        ApiService.getData(
            assignPromsEndpoint,
            this.setUsers
        )
    }

    assignPromotion = (e) => {
        e.preventDefault()
        const assignUser = {
            unitcost: e.target.cost.value,
            email: e.target.user.value,
            promotion_id: this.state.id
        }
        console.log(assignUser)

        ApiService.postDataHalf(assignPromsEndpoint, assignUser)
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            }) 
        this.setState({ assign: false })
    }

    changeUser = (user) => {
        this.setState({
            user: user
        })
    }

    render(){
        return (
            <div className='data-container'>
                <h2>Promotions</h2>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total Cost</th>
                            <th>Assign User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.data[0]) 
                            ? this.state.data.map(p => (
                            <tr className="promotions-table" key={p.data.id}>
                                <td>{p.data.typepromotion}</td>
                                <td>{p.data.startdate}</td>
                                <td>{p.data.duedate}</td>
                                <td>{p.data.totalcost}</td>
                                <td>
                                    <Link className="close-icon" to={`/broker/promotions/${p.data.id}`}>
                                        <PersonAddIcon />
                                    </Link>
                                </td>
                            </tr>
                            ))
                            :  <tr>
                                    <td className="nothing-to-display">No Promotions to Display</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                        }
                    </tbody>
                </table>
                <p>{(this.state.error) ? this.state.error : null}</p>
                <p className="entry-count">Showing {this.state.data.length} of {this.state.data.length} entries</p>
            </div>
        )
    }
}

export default Promotion