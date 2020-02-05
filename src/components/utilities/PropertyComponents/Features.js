import React, { Component } from 'react'
import config from '../../../config'
import BrokerContext from '../../../contexts/BrokerContext'
import ApiService from '../../../services/api-service'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CircularProgress from '@material-ui/core/CircularProgress';

class Features extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            error: null,
            features: [],
            featuretypes: [],
            loading: false,
            deliver: ""
        }
    }

    setFeatures = (feat) => {
        this.setState({
            features: feat
        })
    }

    setFeatureTypes = (featuretypes) => {
        this.setState({
            featuretypes
        })
    }


    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/features`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setFeatures(data)
            })
            .catch(error => {
                console.log(error)
            })
        ApiService.getDataHalf(`${config.API_ENDPOINT}/featuretypes`)
            .then(data => {
                this.setFeatureTypes(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    setValue = e => {
        this.setState({
            deliver: e.target.value
        })
    }

    addFeature = (e) => {
        e.preventDefault()
        
        this.setState({ loading: true })
        
        const newFeature = {
            featuredesc: e.target.description.value,
            featuretype_id: e.target.feature_type.value,
            quantity: e.target.quantity.value,
            condition: e.target.condition.value,
            deliver: this.state.deliver
        }

        for (const key in newFeature) {
            if(newFeature[key] === ''){
                this.setState({
                    error: 'Please fill out all fields',
                    loading: false
                })
                return
            }
        }

        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/features`

        ApiService.postDataHalf(endpoint, newFeature)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setFeatures(data)
                        this.toggleForm()
                    })
            })
            .then(() => {
                this.setState({
                    loading: false
                })
            })
            .catch(error => {
                console.log(error)
            })

        e.target.description.value = ""
        e.target.feature_type.value = ""
    }

    deleteFeature = (id) => {
        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/features`
        ApiService.deleteDataHalf(endpoint, id)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setFeatures(data)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    toggleForm = () => {
        const form = document.getElementById('feature-form')
        form.classList.toggle('hidden')
        const btn = document.getElementById('f-btn')
        if(form.className === 'sp-form hidden'){
            btn.innerHTML = '+'
        } else {
            btn.innerHTML = '-'
        }
    }

    render() {
        return (
            <div>
                <div className='header-grid-component'>
                    <button className='add' id="f-btn" onClick={this.toggleForm}>+</button>
                </div>
                <form className="sp-form hidden" id="feature-form" onSubmit={(e) => {this.addFeature(e)}}>
                    {(this.state.error) ? <div className="error">{this.state.error}</div> : null}
                    <div className="form-group">
                        <label htmlFor="feature_type">Feature Type: </label>
                        <select name="feature_type">
                            <option value="">Select a Feature</option>
                            {this.state.featuretypes.map(f => 
                                <option key={f.id} value={f.id}>{f.featuredescr}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <input type="text" name="description"></input>
                    </div>
                    <div className="form-group row">
                        <div>
                            <label htmlFor="quantity">Quantity: </label>
                            <input type="number" name="quantity"></input>
                        </div>
                        <div>
                            <label htmlFor="condition">Condition: </label>
                            <input type="text" name="condition"></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Deliver</label>
                        <div className="radio-grid" onChange={(e) => this.setValue(e)}>
                            <input type="radio" name="yes" value="true"></input>
                            <label htmlFor="yes">Yes</label>
                            <input type="radio" name="yes" value="false"></input>
                            <label htmlFor="yes">No</label>
                        </div>
                    </div>
                    {(this.state.loading)
                            ? <div className="loading-property">
                                <CircularProgress />
                            </div>
                            : <input type="submit" className="submit" value="Add Feature" />
                        }
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Condition</th>
                            <th className="delete-heading">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.features[0])
                        ? this.state.features.map(f => {
                            return (
                                <tr key={f.id}>
                                    <td>
                                        {(this.state.featuretypes).map(t => 
                                            (t.id === f.featuretype_id) ? t.featuredescr : null
                                        )}
                                    </td>
                                    <td>{f.featuredesc}</td>
                                    <td>{f.quantity}</td>
                                    <td>{f.condition}</td>
                                    <td className="delete">
                                        <DeleteOutlineIcon 
                                            className="delete-btn" 
                                            onClick={() => this.deleteFeature(f.id)} 
                                        />
                                    </td>
                                </tr>
                            )
                        })
                        :<tr>
                            <td className='nothing-to-display'>No features to display</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Features