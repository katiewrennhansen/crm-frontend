import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../contexts/AdminContext'
import DeleteModal from '../../pagecomponents/DeleteModal'

const processEndpoint = config.PROCESS_ENDPOINT

class Process extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    componentDidMount(){
        ApiService.getData(
            processEndpoint, 
            this.context.setProcess
        )
    }

    componentDidUpdate(){
        ApiService.getData(
            processEndpoint, 
            this.context.setProcess
        )
    }

    addProcess = (e) => {
        e.preventDefault()
        const newProcess = {
            processt: {
                processdesc: e.target.process.value,
                steps: [],
                company_id: 6,
                user_id: 1
            }
        }
        ApiService.postData(
            processEndpoint, 
            newProcess, 
            this.context.updateData, 
            this.context.hideModal
        ) 
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.context.id
        const updatedContent = {
            processt: {
                processdesc: e.target.process.value,
            }
        }
        ApiService.updateData(
            processEndpoint, 
            id, 
            updatedContent, 
            this.context.hideUpdate
        )
    }

    render(){  
        const context = this.context
        return (
            <>
                <DeleteModal
                    props={context}
                    endpoint={processEndpoint}
                />
                <Modal className='update-modal' show={context.update}>
                    <div className='update-modal-grid'>
                        <h3>Update {context.name}</h3>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='maint_type'></label>
                                <TextInput
                                    id='process'
                                    name='process'
                                    label='Process Name'
                                    type='text'
                                />
                            </div>
                            <div className='update'>
                                <button type='submit'>Update</button>
                            </div>
                        </form>
                        <div className='cancel'>
                            <button onClick={context.hideUpdate}>Cancel</button>   
                        </div>
                    </div>
                </Modal>
                <Modal className='add-modal' show={context.show} >
                    <form 
                        className= 'add-content' 
                        onSubmit={(e) => this.addProcess(e)}
                    >
                        <h3>Add a Process</h3>
                        <div className='form-group'>
                            <label htmlFor='feature_name'></label>
                            <TextInput 
                                id='process'
                                name='process'
                                label='Process'
                                type='text'
                                autoComplete='text'
                            />
                        </div>
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <div className='cancel'>
                        <button onClick={context.hideModal}>Cancel</button>
                    </div>
                </Modal>
                <div className='data-container'>
                    <h3>Process</h3>
                    <button className='add-data' onClick={context.showModal}>Add Process</button>
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Steps</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {context.process.map(p => {
                                return (
                                <tr key={p.data.id}>
                                    <td>{p.data.processdesc}</td>
                                    <td className='update'>
                                        <Link to={`/dashboard/process/${p.data.id}`}>View Steps</Link>
                                    </td>
                                    <td className='update'>
                                        <button onClick={() => context.updateUpdate(p.data.processdesc, p.data.id)}>Update</button>
                                    </td>
                                    <td className='delete'>
                                        <button onClick={() => context.updateDelete(p.data.processdesc, p.data.id)}>Delete</button>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default Process