import React, { Component } from 'react'
import Moment from 'react-moment'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
// import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const endpoint = `${config.API_ENDPOINT}/assets/0/assetcomments`

class Alerts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            alerts: [],
            commtypes: [],
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
        ApiService.getDataHalf(`${config.API_ENDPOINT}/commtypes`)
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
                this.setState({ checked: false })
            })
    }

    render(){  
        return (
            <div className='data-container'>
                <h2>Alerts</h2>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Mark Completed</th>
                            <th>Comment Type</th>
                            <th>Comment</th>
                            <th>Request Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.alerts.map(a => (
                        <tr key={a.data.id}>
                            <td className="mark-completed" id={a.data.id}>
                                <RadioButtonUncheckedIcon onClick={() => this.handleCompleted(a.data.id)} />
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
                                <Moment format="YYYY/MM/DD">{a.data.requestdate}</Moment>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <p className="entry-count">Showing {this.state.alerts.length} of {this.state.alerts.length} entries</p>
            </div>
        )
    }
}

export default Alerts