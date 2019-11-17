import React, { Component } from 'react'
import config from '../../../../../config'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import AdminContext from '../../../../../AdminContext'
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
    }

    deleteStep = (id) => {
        // const stepsEndpoint = `${processEndpoint}/${this.props.id}/steps`
        // ApiService.deleteData(
        //     stepsEndpoint,
        //     id,
        //     this.context.updateData
        // )
        console.log(id)
    }

    

    render(){ 
        const context = this.context
        return (
            <div className='data-container'>
                <h3>Process For: {this.state.name.processdesc}</h3>
                <div>
                    {context.data.map(s => (
                        <div key={s.id}>
                            <span>{s.sequence}. &nbsp;</span>
                            <span>{s.stepdesc}</span>
                            {/* <button onClick={this.deleteStep(s.id)}>&#10005;</button> */}
                        </div>
                    ))}
                </div>
                <form onSubmit={(e) => this.addStep(e)}>
                    <TextInput 
                        type='number'
                        name='sequence'
                    />
                    <TextInput 
                        type='text'
                        name='process'
                    />
                    <SubmitButton text='Add Step'/>
                </form>      
            </div>
        )
    }
}

export default ProcessSteps