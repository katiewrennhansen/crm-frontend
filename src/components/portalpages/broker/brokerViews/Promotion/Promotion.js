import React, { Component } from 'react'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import Modal from '../../../../utilities/Modal/Modal'
import SubmitButtom from '../../../../Login/LoginComponents/SubmitButton'

const promotionsEndpoint = config.PROMOTIONS_ENDPOINT
const assignPromsEndpoint = config.ASSIGN_PROMOTIONS_ENDPOINT
// const caEndpoint = config.CUSTOMER_ACCOUNTS_ENDPOINT


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
            <>
                <Modal className='add-modal' show={this.state.assign}>
                    <div className='add-modal-grid'>
                    <h3>Assign user to {this.state.name}</h3>
                    <form onSubmit={(e) => this.assignPromotion(e)}>
                        <div className='form-group'>
                            <select name="user" onChange={(e) => this.changeUser(e.target.value)}>
                                <option value="">Select a User</option>
                            {this.state.users.map(user => (
                                <option 
                                    key={user.customer.id} 
                                    value={user.customer.email}
                                >
                                    {user.customer.name}
                                </option>
                            ))}  
                            </select>
                        </div>
                        <input type='number' name='cost' placeholder="cost"></input>
                        <div>
                            <SubmitButtom text='Submit' />
                        </div>
                    </form>
                    <div className='update'>
                        <button onClick={() => this.setAssign(false)}>Cancel</button>
                    </div>
                    </div>
                </Modal>
                <div className='data-container'>
                    <h3>Promotions</h3>
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
                                <td>{p.data.startdate}</td>
                                <td>{p.data.duedate}</td>
                                <td>{p.data.totalcost}</td>
                                <td className='update'>
                                    <button onClick={() => this.setAssign(true, p.data.id, p.data.typepromotion)}>Assign to User</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>{(this.state.error) ? this.state.error : null}</p>
                </div>
            </>
        )
    }
}

export default Promotion