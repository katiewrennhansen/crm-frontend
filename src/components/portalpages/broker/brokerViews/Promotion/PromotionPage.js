import React, { Component } from 'react'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'

const promotionsEndpoint = config.PROMOTIONS_ENDPOINT
const assignPromsEndpoint = config.ASSIGN_PROMOTIONS_ENDPOINT


class PromotionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promotion: [],
            assigned: [],
            users: [],
            error: null
        };
    }

    setPromotion = (data) => {
        const promotion = data.data
        this.setState({
            promotion
        })
    }

    setAssigned = (assigned) => {
        this.setState({
            assigned
        })
    }

    setUsers = (users) => {
        const newUsers = users.customers
        this.setState({
            users: newUsers
        })
    }

    componentDidMount(){
        const singlePromoEndpoint = `${config.API_ENDPOINT}/promotions/${this.props.id}`
        ApiService.getDataHalf(singlePromoEndpoint)
            .then(data => {
                console.log(data)
                this.setPromotion(data)
                this.setAssigned(data.data.assigned)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getData(
            assignPromsEndpoint,
            this.setUsers
        )
    }

    assignPromotion = (e) => {
        e.preventDefault()
        const assignUser = {
            unitcost: e.target.cost.value,
            email: e.target.customer.value,
            promotion_id: this.props.id,
        }
        console.log(assignUser)

        ApiService.postDataHalf(assignPromsEndpoint, assignUser)
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            }) 
        e.target.cost.value = ""
        e.target.customer.value = ""
        e.target.date.value = ""
    }


    toggleForm = () => {
        const form = document.getElementById('costs-form')
        form.classList.toggle('hidden')
        const btn = document.getElementById('c-btn')
        if(form.className === 'sp-form hidden'){
            btn.innerHTML = '+'
        } else {
            btn.innerHTML = '-'
        }
    }

    render(){
        const data = this.state.promotion
        return (
            <>
            

                <div className='container'>
                    <div className='header-grid'>
                        <h3>{data.typepromotion}</h3>
                    </div>
                    <p>Start: {data.startdate}</p>
                    <p>End: {data.enddate}</p>
                    <p>Total Cost: {data.totalcost}</p>

                    <div className='header-grid'>
                        <h3>Assigned Users</h3>
                        <button className='add' id="c-btn" onClick={this.toggleForm}>+</button>
                    </div>
                    <form className="sp-form hidden" id="costs-form" onSubmit={(e) => {this.assignPromotion(e)}}>
                        <div className="form-group">
                            <label htmlFor="customer">Customer: </label>
                            <select name="customer">
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
                        <div className="form-group">
                            <label htmlFor="cost">Cost: </label>
                            <input type="number" name="cost"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Date: </label>
                            <input type="date" name="date"></input>
                        </div>
                        <input type="submit" className="submit" value="Assign Promotion"></input>
                    </form>
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Cost</th>
                                <th>Assigned</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.assigned.map(a => {
                                return (
                                <tr key={a.id}>
                                    <td>{a.customer}</td>
                                    <td>{a.cost}</td>
                                    <td>{a.assigned}</td>
                                    <td>
                                        <button className='update-btn' onClick={() => this.setAssign(true, data.id, data.typepromotion)}>Unassign</button>
                                    </td>
                                </tr>
                                )
                            })}
                            
                        </tbody>
                    </table>
                        
                    <p>{(this.state.error) ? this.state.error : null}</p>
                </div>
            </>
        )
    }
}

export default PromotionPage