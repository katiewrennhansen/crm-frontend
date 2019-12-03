import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import AdminContext from '../../../../../contexts/AdminContext'
import ApiService from '../../../../../services/api-service'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'

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

    addStep = (e) => {
        e.preventDefault()
        const stepsEndpoint = `${processEndpoint}/${this.props.id}/steps`
        const newProcess = {
                sequence: e.target.sequence.value,
                stepdesc: e.target.process.value,
                processt_id: this.props.id
        }
        ApiService.postData(
            stepsEndpoint,
            newProcess, 
            this.context.updateData,
        )
        document.getElementById('add-steps').reset()
    }

    deleteStep = (id) => {
        const stepsEndpoint = `${processEndpoint}/${this.props.id}/steps`
        ApiService.deleteData(
            stepsEndpoint, 
            id, 
            this.context.setData
        )
    }

    render(){ 
        const context = this.context
        return (
            <div className='process-container'>
                <div className="header-grid">
                    <h3>Process For: {this.state.name.processdesc}</h3>
                    <Link className="cancel-btn" to='/dashboard/process'>Back</Link>
                </div>
                <div>
                    {context.data.map(s => (
                        <div className='steps-grid' key={s.id}>
                            <span>{s.sequence}.</span>
                            <span>{s.stepdesc}</span>
                            <button className='delete-icon' onClick={() => this.deleteStep(s.id)}>&#10005;</button>
                        </div>
                    ))}
                </div>
                <form id='add-steps' className="add-form" onSubmit={(e) => this.addStep(e)}>
                    <h4>Add Steps to {this.state.name.processdesc}</h4>
                    <div className='form-group'>
                        <label htmlFor='sequence'>Sequence Number</label>
                        <input 
                            type='number'
                            name='sequence'
                            placeholder='Sequence Number'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='process'>Step Name</label>
                        <input 
                            type='text'
                            name='process'
                            placeholder='Step Name'
                        />
                    </div>
                    <SubmitButton text='Add Step'/>
                </form>      
            </div>
        )
    }
}

export default ProcessSteps