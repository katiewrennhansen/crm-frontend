import React, { Component } from 'react'
import config from '../../../config'
import BrokerContext from '../../../contexts/BrokerContext'
import ApiService from '../../../services/api-service'

class Features extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            features: [],
            featuretypes: []
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

    addFeature = (e) => {
        e.preventDefault()
        
        const newFeature = {
            featuredesc: e.target.description.value,
            featuretype_id: e.target.feature_type.value
        }

        const endpoint = `${config.API_ENDPOINT}/assets/${this.props.id}/features`

        ApiService.postDataHalf(endpoint, newFeature)
            .then(data => {
                ApiService.getDataHalf(endpoint)
                    .then(data => {
                        this.setFeatures(data)
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
                <div className='header-grid'>
                    <h3>Features</h3>
                    <button className='add' id="f-btn" onClick={this.toggleForm}>+</button>
                </div>
                <form className="sp-form hidden" id="feature-form" onSubmit={(e) => {this.addFeature(e)}}>
                    <div className="form-group">
                        <label htmlFor="feature_type">Feature Type: </label>
                        <select name="feature_type">
                            <option value="">Select a Feature</option>
                            {this.state.featuretypes.map(f => {
                                return (
                                <option key={f.id} value={f.id}>{f.featuredescr}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <input type="text" name="description"></input>
                    </div>
                    <input type="submit" className="submit" value="Add Feature"></input>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.features.map(f => {
                            return (
                                <tr key={f.id}>
                                    <td>
                                        {(this.state.featuretypes).map(t => {
                                            if(t.id === f.featuretype_id){
                                                return t.featuredescr
                                            } else {
                                                return null
                                            }
                                        })}
                                    </td>
                                    <td>{f.featuredesc}</td>
                                    <td className="delete">
                                        <button className="delete-btn" onClick={() => {this.deleteFeature(f.id)}}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Features