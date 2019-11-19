import React, { Component } from 'react'
import Moment from 'react-moment'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import Modal from '../../../admin/pagecomponents/Modal'
import SubmitButtom from '../../../../Login/LoginComponents/SubmitButton'

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

    handleError = (error) => {
        // this.setState({
        //     error: error
        // })
        console.log(error)
    }

    assignPromotion = (e) => {
        e.preventDefault()
        const assignUser = {
            unitcost: e.target.cost.value,
            email: this.state.user,
            promotion_id: this.state.id
        }
        console.log(assignUser)
            fetch(assignPromsEndpoint, {
                method: 'POST',
                body: JSON.stringify(assignUser),
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${config.API_KEY}`
                }
            })
            .then(res => 
                (!res.ok)
                    ? res.json().then(error => Promise.reject(error))
                    : res.json()
            )
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
                this.handleError(error)
            }) 
        
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
                            <select onChange={(e) => this.changeUser(e.target.value)}>
                                <option>Select a User</option>
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