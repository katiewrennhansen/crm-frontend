import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../../../utilities/Modal/Modal'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../contexts/AdminContext'
import DeleteModal from '../../../../utilities/Modal/DeleteModal'
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PageviewIcon from '@material-ui/icons/Pageview';
import EditIcon from '@material-ui/icons/Edit';

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

    componentWillUnmount(){
        this.context.setData([])
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
        ApiService.updateDataHalf(processEndpoint, id, updatedContent)
        .then(res => {
            ApiService.getDataHalf(processEndpoint)
                .then(data => {
                    this.context.setProcess(data)
                    this.context.hideUpdate()
                })
        })
        .catch(error => {
            console.log(error)
        }) 
    }


    deleteProcess = (id) => {
        this.context.deleteProcess(id)
        ApiService.deleteData(
            processEndpoint, 
            id, 
            this.context.setProcess
        )
        this.context.hideDelete()
    }

    render(){  
        const context = this.context
        return (
            <>
                <DeleteModal
                    props={context}
                    endpoint={processEndpoint}
                    deleteFn={this.deleteProcess}
                />

                <Modal className='update-modal' show={context.update}>
                    <CloseIcon 
                        className="close-icon" 
                        onClick={context.hideUpdate}
                    />
                    <div className='update-content'>
                        <form className='form-group-form' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='process'>
                                    <h3>Update: {context.name}</h3>
                                </label>
                                <input
                                    id='process'
                                    name='process'
                                    type='text'
                                />
                            </div>
                            <input type="submit" className="submit-full submit-modal" value="Update" />
                        </form>
                    </div>
                </Modal>

                <Modal className='add-modal' show={context.show} >
                    <CloseIcon 
                        className="close-icon" 
                        onClick={context.hideModal}
                    />
                    <form 
                        className= 'add-content' 
                        onSubmit={(e) => this.addProcess(e)}
                    >
                        <h3>Add a Process</h3>
                        <div className='form-group'>
                            <label htmlFor='feature_name'></label>
                            <input 
                                id='process'
                                name='process'
                                placeholder='Process'
                                type='text'
                            />
                        </div>
                        <input type="submit" className="submit-full submit-modal" value="Update" />
                    </form>
                </Modal>
                
                <div className='data-container'>
                    <h2>Process</h2>
                    <AddIcon 
                        className="add-icon" 
                        aria-label="add comment type" 
                        onClick={context.showModal} 
                    />                      
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>View Steps</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {context.process.map(p => {
                                return (
                                <tr key={p.data.id}>
                                    <td>{p.data.processdesc}</td>
                                    <td>
                                        <Link className="view" to={`/dashboard/process/${p.data.id}`}>
                                            <PageviewIcon />
                                        </Link>
                                    </td>
                                    <td>
                                        <button className='update-btn' onClick={() => context.updateUpdate(p.data.processdesc, p.data.id)}>
                                            <EditIcon />
                                        </button>
                                    </td>
                                    <td>
                                        <button className='delete-btn' onClick={() => context.updateDelete(p.data.processdesc, p.data.id)}>
                                            <DeleteOutlineIcon />
                                        </button>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                    <p className="entry-count">Showing {context.process.length} of {context.process.length} entries</p>
                </div>
            </>
        )
    }
}

export default Process