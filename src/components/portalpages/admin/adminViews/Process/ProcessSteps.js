import React, { Component } from 'react'
import config from '../../../../../config'
import AdminContext from '../../../../../AdminContext'
import ApiService from '../../../../../services/api-service'

const processEndpoint = config.PROCESS_ENDPOINT

class ProcessSteps extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            error: null
        };
    }

    setName = (data) => {
        const newData = data.data
        this.setState({
            name: newData
        })
    }

    componentDidMount(){
        const stepsEndpoint = `${processEndpoint}/${this.props.id}/steps`
        const pNameEndpoint = `${processEndpoint}/${this.props.id}`
        ApiService.getData(
            stepsEndpoint, 
            this.context.setData
        )
        ApiService.getData(
            pNameEndpoint, 
            this.setName
        )
    }

    addProcess = (e) => {
        e.preventDefault()
        const stepsEndpoint = `${processEndpoint}/${this.props.id}/steps`
        const newProcess = {
            data: {
                processdesc: e.target.process.value,
                steps: []
            }
        }
        ApiService.postData(
            stepsEndpoint,
            newProcess, 
            this.context.updateData, 
            this.context.hideModal
        )
    }

    render(){ 
        const context = this.context
        return (
            <div className='data-container'>
                <h3>Process For: {this.state.name.processdesc}</h3>
                <button className='add-data'>Edit Steps</button>
                <div>
                    {context.data.map(s => (
                        <div key={s.id}>
                            <span>{s.sequence}. &nbsp;</span>
                            <span>{s.stepdesc}</span>
                        </div>
                    ))}
                </div>      
            </div>
        )
    }
}

export default ProcessSteps