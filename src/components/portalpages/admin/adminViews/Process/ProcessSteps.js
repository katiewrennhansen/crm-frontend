import React, { Component } from 'react'
import config from '../../../../../config'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import AdminContext from '../../../../../AdminContext'
import ApiService from '../../../../../services/api-service'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import './Process.css'

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

    componentDidUpdate(){
        const stepsEndpoint = `${processEndpoint}/${this.props.id}/steps`
        ApiService.getData(
            stepsEndpoint, 
            this.context.setData
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
        const stepsEndpoint = `${processEndpoint}/${this.props.id}/steps/${id}`
        fetch(`${stepsEndpoint}`, {
            method: 'DELETE',
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
            this.context.updateData(id)
        })
        .catch(error => {
            console.error(error)
        })
    }

    

    render(){ 
        const context = this.context
        return (
            <div className='process-container'>
                <h3>Process For: {this.state.name.processdesc}</h3>
                <div>
                    {context.data.map(s => (
                        <div className='steps-grid' key={s.id}>
                            <span>{s.sequence}.</span>
                            <span>{s.stepdesc}</span>
                            <button className='delete-icon' onClick={() => this.deleteStep(s.id)}>&#10005;</button>
                        </div>
                    ))}
                </div>
                <form id='add-steps' onSubmit={(e) => this.addStep(e)}>
                    <h4>Add Steps to {this.state.name.processdesc}</h4>
                    <div className='form-group'>
                        <label htmlFor='sequence'></label>
                        <TextInput 
                            class='process-input'
                            type='number'
                            name='sequence'
                            label='Sequence Number'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='process'></label>
                        <TextInput 
                            class='process-input'
                            type='text'
                            name='process'
                            label='Step Name'
                        />
                    </div>
                    <SubmitButton text='Add Step'/>
                </form>      
            </div>
        )
    }
}

export default ProcessSteps