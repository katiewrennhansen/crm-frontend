import React, { Component } from 'react'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'

const endpoint = `${config.API_ENDPOINT}/assignedproms`

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
                this.setPromotion(data)
                this.setAssigned(data.data.assigned)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getData(
            endpoint,
            this.setUsers
        )
    }

    assignPromotion = (e) => {
        const singlePromoEndpoint = `${config.API_ENDPOINT}/promotions/${this.props.id}`

        e.preventDefault()
        const assignUser = {
            unitcost: e.target.cost.value,
            email: e.target.customer.value,
            promotion_id: this.props.id,
        }

        ApiService.postDataHalf(endpoint, assignUser)
            .then(data => {
                ApiService.getDataHalf(singlePromoEndpoint)
                    .then(data => {
                        this.setAssigned(data.data.assigned)  
                    })
            })
            .catch(error => {
                console.log(error)
            }) 
        e.target.cost.value = ""
        e.target.customer.value = ""
        e.target.date.value = ""
    }

    
    unassignPromo = (id) => {
        const singlePromoEndpoint = `${config.API_ENDPOINT}/promotions/${this.props.id}`
        ApiService.deleteDataHalf(endpoint, id)
            .then(data => {
                ApiService.getDataHalf(singlePromoEndpoint)
                    .then(data => {
                        this.setAssigned(data.data.assigned)
                    })
            })
            .then(error => {
                console.log(error)
            })
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
                        <h2>{data.typepromotion}</h2>
                    </div>
                    <p>Start: {data.startdate}</p>
                    <p>End: {data.enddate}</p>
                    <p>Total Cost: {data.totalcost}</p>

                    <div className='header-grid'>
                        <h3>Assigned Users</h3>
                        <button className='add' id="c-btn" onClick={this.toggleForm}>+</button>
                    </div>
                    
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
                                        <button className='update-btn' onClick={() => this.unassignPromo(a.id)}>Unassign</button>
                                    </td>
                                </tr>
                                )
                            })}
                            
                        </tbody>
                    </table>
                    <form className="sp-form hidden" id="costs-form" onSubmit={(e) => {this.assignPromotion(e)}}>
                        <h3>Assign User to {data.typepromotion}</h3>
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
                    <p>{(this.state.error) ? this.state.error : null}</p>
                </div>
            </>
        )
    }
}

export default PromotionPage