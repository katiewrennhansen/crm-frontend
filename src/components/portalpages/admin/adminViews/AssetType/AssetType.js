import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'


class AssetType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false,
            assets: [],
            error: null
        };
    }

    removeAsset = id => {
        const newAssets = this.state.assets.filter(a =>
          a.id !== id
        )
        this.setState({
          assets: newAssets
        })
        this.props.func.hideDelete()
      }
    
    setAssets = assets => {
        this.setState({
            assets: assets,
            error: null
        })
    }

    updateAssets = data => {
        this.setState({
            assets: [...this.state.assets, data],
            error: null
        })
    }

    componentDidMount(){
        fetch(config.ASSET_TYPE_ENDPOINT, {
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
            this.setAssets(data)
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    addAsset = (e) => {
        e.preventDefault()
        const newAssetType = {
            assettdesc: e.target.asset_type.value,
            company_id: 6,
            user_id: 6,
            updated_at: new Date()
        }
        fetch(config.ASSET_TYPE_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(newAssetType),
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
            this.updateAssets(data)
            this.props.func.hideModal()
        })
        .catch(error => {
            this.setState({ error })
        }) 
    }

    render(){ 
        const asset = this.props.func 
        return (
            <>
                <Modal className='add-modal' show={asset.show} >
                    <form 
                        className='add-content'
                        onSubmit={(e) => this.addAsset(e)}
                    >
                        <h3>Add an Asset Type</h3>
                        <div className='form-group'>
                            <label htmlFor='asset_type'></label>
                            <TextInput 
                                id='asset_type'
                                name='asset_type'
                                label='Asset Type'
                                type='text'
                            />
                        </div>
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <div className='cancel'>
                        <button onClick={asset.hideModal}>Cancel</button>
                    </div>
                </Modal>
                
                <div className='data-container'>
                    <h3>Asset Type</h3>
                    <button className='add-data' onClick={asset.showModal}>Add Asset Type</button>
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date Created</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.assets.map(a => {
                            return (
                            <tr key={a.id}>
                                <td>{a.assettdesc}</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{a.created_at}</Moment>
                                </td>
                                <td className='update'>
                                    <button 
                                        onClick={() => asset.updateUpdate(a.assettdesc, a.id)}
                                    >
                                        Update
                                    </button>
                                    {(asset.update) ? asset.updateModal(config.COMMENTS_ENDPOINT , this.updateAsset) : null}                                    
                                </td>
                                <td className='delete'>
                                    <button 
                                        onClick={() => asset.updateDelete(a.assettdesc, a.id)}
                                    >
                                        Delete
                                    </button>
                                    {(asset.delete) ? asset.deleteModal(config.COMMENTS_ENDPOINT , this.removeAsset) : null}                                    
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



export default AssetType