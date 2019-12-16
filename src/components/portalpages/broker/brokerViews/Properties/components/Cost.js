import React, { Component } from 'react'
import config from '../../../../../../config'
import BrokerContext from '../../../../../../contexts/BrokerContext'
import ApiService from '../../../../../../services/api-service'

class Cost extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            costs: []
        }
    }

    setCosts = (costs) => {
        this.setState({
            costs
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/costs`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setCosts(data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    addCost = (e) => {
        e.preventDefault()
        const newCost = {
            cost: {
                concept: e.target.description.value,
                year: e.target.year.value,
                annualamount: e.target.annualamount.value,
                kind: e.target.kind.value
            }
        }
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/costs`
        ApiService.postDataHalf(endpoint, newCost)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setCosts(data)
                    })
            })
            .catch(error => {
                console.log(error)
            })

        e.target.description.value = ""
        e.target.year.value = ""
        e.target.annualamount.value = ""
        e.target.kind.value = ""
    }

    deleteCost = (id) => {
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/costs`
        ApiService.deleteDataHalf(endpoint, id)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setCosts(data)
                    })
            })
            .catch(error => {
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

    render() {
        return (
            <div>
            <div className='header-grid'>
                    <h2>Costs</h2>
                    <button id="c-btn" className="add" onClick={this.toggleForm}>+</button>
                </div>
                <form className="sp-form hidden" id="costs-form" onSubmit={(e) => {this.addCost(e)}}>
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <input type="text" name="description"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year: </label>
                        <input type="number" name="year"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="annualamount">Annual Amount: </label>
                        <input type="number" name="annualamount"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="kind">Kind: </label>
                        <input type="text" name="kind"></input>
                    </div>
                    <input type="submit" className="submit" value="Add Cost"></input>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Year</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.costs.map(f => {
                            return (
                                <tr key={f.id}>
                                    <td>{f.kind}</td>
                                    <td>{f.concept}</td>
                                    <td>{f.annualamount}</td>
                                    <td>{f.year}</td>
                                    <td className="delete">
                                        <button className="delete-btn" onClick={() => {this.deleteCost(f.id)}}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Cost