import React, { Component } from 'react'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'


class Process extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false,
            process: [],
            error: null
        };
    }

    removeProcess = id => {
        const newProcess = this.state.process.filter(p =>
          p.id !== id
        )
        this.setState({
          process: newProcess
        })
        this.props.func.hideDelete()
      }
    
    setProcess = process => {
        this.setState({
            process: process,
            error: null
        })
    }
    updateProcess = data => {
        this.setState({
            process: [...this.state.process, data],
            error: null
        })
    }

    componentDidMount(){
        fetch(config.PROCESS_ENDPOINT, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
        })
        .then(data => {
            this.setProcess(data.processts)
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    addProcess = (e) => {
        e.preventDefault()
        const newProcess = {
            data: {
                processdesc: e.target.process.value,
                steps: []
            }
        }
        fetch(config.PROCESS_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(newProcess),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            console.log(res)
            if(!res.ok){
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
        })
        .then(data => {
            this.updateProcess(data)
            this.props.func.hideModal()
        })
        .catch(error => {
            this.setState({ error })
        }) 
    }


    

    render(){  
        const process = this.props.func
        return (
            <>
                <Modal show={process.show} >
                    <form 
                        className= 'add_feature' 
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
                        <SubmitButton className='submit_property' text='Save'/>
                    </form>
                    <button onClick={process.hideModal}>Cancel</button>
                </Modal>
                <div className='promotion-container'>
                    <h3>Process</h3>
                    <button className='add_promotion' onClick={process.showModal}>Add Process</button>
                    <table className='promotion_table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Show In Portal</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.process.map(p => {
                                return (
                                <tr>
                                    <td>{p.data.processdesc}</td>
                                    <td>Created</td>
                                    <td><button>Update</button></td>
                                    <td className='delete'>
                                        <button 
                                            onClick={() => process.updateDelete(p.data.processdesc, p.data.id)}
                                        >
                                            Delete
                                        </button>
                                        {(process.delete) ? process.deleteModal(config.PROCESS_ENDPOINT, this.removePromotion) : null}
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