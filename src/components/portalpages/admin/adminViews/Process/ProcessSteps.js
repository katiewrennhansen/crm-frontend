import React, { Component } from 'react'
import config from '../../../../../config'
import AdminContext from '../../../../../AdminContext'

const processEndpoint = config.PROCESS_ENDPOINT

class ProcessSteps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false,
            process: [],
            steps: [],
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
    
    setProcess = (process, steps) => {
        this.setState({
            process: process,
            steps: steps,
            error: null
        })
    }
    updateSteps = data => {
        this.setState({
            steps: [...this.state.steps, data],
            error: null
        })
    }

    componentDidMount(){
        fetch(`${processEndpoint}/${this.props.id}`, {
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
            this.setProcess(data.data, data.data.steps)
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
        fetch(processEndpoint, {
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
            this.updateSteps(data)
            this.props.func.hideModal()
        })
        .catch(error => {
            this.setState({ error })
        }) 
    }


    render(){ 
        const data = this.state.process
        return (
                <div className='data-container'>
                    <h3>Process For: {data.processdesc}</h3>
                    <button className='add-data'>Edit Steps</button>
                    <div>
                        {this.state.steps.map(s => (
                            <div>
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