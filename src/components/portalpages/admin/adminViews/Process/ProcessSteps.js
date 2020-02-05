import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import AdminContext from '../../../../../contexts/AdminContext'
import ApiService from '../../../../../services/api-service'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CloseIcon from '@material-ui/icons/Close';

class ProcessSteps extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            process: '',
            error: null
        };
    }

    setProcess = (data) => {
        this.setState({
            process: data.data
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/processts/${this.props.id}`
        ApiService.getData(
            `${endpoint}/steps`, 
            this.context.setData
        )
        ApiService.getData(
            endpoint, 
            this.setProcess
        )
    }

    addStep = (e) => {
        e.preventDefault()
        const endpoint = `${config.API_ENDPOINT}/processts/${this.props.id}/steps`
        const newProcess = {
                sequence: e.target.sequence.value,
                stepdesc: e.target.process.value,
                processt_id: this.props.id
        }
        ApiService.postData(
            endpoint,
            newProcess, 
            this.context.updateData,
        )
        document.getElementById('add-steps').reset()
    }

    deleteStep = (id) => {
        const endpoint = `${config.API_ENDPOINT}/processts/${this.props.id}/steps`
        ApiService.deleteData(
            endpoint, 
            id, 
            this.context.setData
        )
    }

    render(){ 
        const context = this.context
        const name = this.state.process.processdesc
        return (
            <div className='process-container'>
                <div className="header-grid">
                    <h2>Process For: {name}</h2>
                    <Link className='edit-btn edit-customer' to='/dashboard/process'>
                        <CloseIcon className="add-icon" />
                    </Link>
                </div>
                <div>
                    {context.data
                        .sort((a, b) => a.sequence - b.sequence)
                        .map(s => (
                            <div className='steps-grid' key={s.id}>
                                <span>{s.sequence}. </span>
                                <span> {s.stepdesc}</span>
                                <button className='delete-icon' onClick={() => this.deleteStep(s.id)}>
                                    <DeleteForeverIcon 
                                        className="delete-icon"
                                    />
                                </button>
                            </div>
                    ))}
                </div>
                <form id='add-steps' className="add-form" onSubmit={(e) => this.addStep(e)}>
                    <h4>Add Steps to: {name}</h4>
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
                    <input type="submit" className="submit" value='Add Step'/>
                </form>      
            </div>
        )
    }
}

export default ProcessSteps