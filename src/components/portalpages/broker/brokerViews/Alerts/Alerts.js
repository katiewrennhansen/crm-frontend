import React, { Component } from 'react'
import Moment from 'react-moment'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const endpoint = `${config.API_ENDPOINT}/assets/0/assetcomments`
const commEndpoint = `${config.API_ENDPOINT}/commtypes`

class Alerts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            alerts: [],
            commtypes: []
        }
    }

    setAlerts = alerts => {
        this.setState({
            alerts
        })
    }

    setComms = commtypes => {
        this.setState({
            commtypes
        })
    }

    componentDidMount(){
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setAlerts(data.assetcomments)
            }) 
            .catch(error => {
                console.log(error)
            }) 
        ApiService.getDataHalf(commEndpoint)
            .then(data => {
                this.setComms(data)
            }) 
            .catch(error => {
                console.log(error)
            })         
    }

    handleCompleted = (id) => {
        const completed = {
            alert: false,
            confirmatindate: new Date()
        }

        ApiService.updateDataHalf(endpoint, id, completed)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setAlerts(data.assetcomments)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){  
        return (
            <div className='data-container'>
                <h2>Alerts</h2>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Comment Type</th>
                            <th>Comment</th>
                            <th>Alarm</th>
                            <th>Request Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.alerts.map(a => (
                        <tr key={a.data.id}>
                            <td className="update-btn">
                                <CheckCircleOutlineIcon />
                            </td>
                            <td>
                                {this.state.commtypes.map(c => {
                                    if(c.id === a.data.commtype_id){
                                        return c.commdesc
                                    }
                                    else {
                                        return null
                                    }
                                })}
                            </td>
                            <td>{a.data.assetcomment}</td>
                            <td>
                                {(a.data.alarm) ? 'Active' : 'Read'}
                            </td>
                            <td>
                                <Moment format="YYYY/MM/DD">{a.data.requestdate}</Moment>
                            </td>
                            <td className="delete">
                                <button 
                                    className="delete-btn" 
                                    onClick={() => this.handleCompleted(a.data.id)}
                                >
                                    {(a.data.alarm) ? 'Mark as Completed' : 'Completed'}
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Alerts