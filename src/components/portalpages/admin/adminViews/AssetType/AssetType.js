import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'

const assetEndpoint = config.ASSET_TYPE_ENDPOINT

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
        ApiService.getData(assetEndpoint, this.setAssets)        
    }

    componentDidUpdate(){
        ApiService.getData(assetEndpoint, this.setAssets)        
    }

    addAsset = (e) => {
        e.preventDefault()
        const newAssetType = {
            assettdesc: e.target.asset_type.value,
            company_id: 6,
            user_id: 6,
            updated_at: new Date()
        }
        ApiService.postData(
            assetEndpoint, 
            newAssetType, 
            this.updateAssets, 
            this.props.func.hideModal
        )
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.props.func.updateContent.id
        let updatedContent = {}
        if(e.target.asset_type.value !== ''){
            updatedContent.assettdesc = e.target.asset_type.value
        }
        ApiService.updateData(
            assetEndpoint, 
            id, 
            updatedContent, 
            this.props.func.hideUpdate
        )
    }

    render(){ 
        const asset = this.props.func 
        return (
            <>
                <Modal className='update-modal' show={asset.update}>
                    <div className='update-modal-grid'>
                        <h3>Update {asset.updateContent.name}</h3>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='maint_type'></label>
                                <TextInput
                                    id='asset_type'
                                    name='asset_type'
                                    label='Asset Type'
                                    type='text'
                                />
                            </div>
                            <div className='update'>
                                <button type='submit'>Update</button>
                            </div>
                        </form>
                        <div className='cancel'>
                            <button onClick={asset.hideUpdate}>Cancel</button>   
                        </div>
                    </div>
                </Modal>
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
                                    <button onClick={() => asset.updateUpdate(a.assettdesc, a.id)}>Update</button>
                                </td>
                                <td className='delete'>
                                    <button 
                                        onClick={() => asset.updateDelete(a.assettdesc, a.id)}
                                    >
                                        Delete
                                    </button>
                                    {(asset.delete) ? asset.deleteModal(assetEndpoint , this.removeAsset) : null}                                    
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