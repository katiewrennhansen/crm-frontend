import React, { Component } from 'react'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';


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
        const endpoint = `${config.API_ENDPOINT}/assets/0/assetcomments`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                console.log(data)
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
        const endpoint = `${config.API_ENDPOINT}/assets/0/assetcomments`
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
                            <th>Property</th>
                            <th>Comment Type</th>
                            <th>Comment</th>
                            <th>Request Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.alerts)
                            ? this.state.alerts.map(a => (
                            <tr key={a.data.id}>
                                <td className="mark-completed" id={a.data.id}>
                                    <RadioButtonUncheckedIcon onClick={() => this.handleCompleted(a.data.id)} />
                                </td>
                                <td>{a.data.adescription1}</td>
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
                                
                                    <td>{a.data.requestdate}</td>
                                
                            </tr>
                            )) 
                            : <tr>
                                <td className="nothing-to-display">No Alerts to Display</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        }
                    </tbody>
                </table>
                {(this.state.alerts)
                ? <p className="entry-count">Showing {this.state.alerts.length} of {this.state.alerts.length} entries</p>
                : <p className="entry-count">Showing 0 of 0 entries</p>
                }
            </div>
        )
    }
}

export default Alerts