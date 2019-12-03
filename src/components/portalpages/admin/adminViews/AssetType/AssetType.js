import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../../../utilities/Modal/Modal'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../contexts/AdminContext'
import DeleteModal from '../../../../utilities/Modal/DeleteModal'

const assetEndpoint = config.ASSET_TYPE_ENDPOINT

class AssetType extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    componentDidMount(){
        ApiService.getData(
            assetEndpoint, 
            this.context.setData
        )        
    }

    componentWillUnmount(){
        this.context.setData([])
    }

    addAsset = (e) => {
        e.preventDefault()
        const newAssetType = {
            assettdesc: e.target.asset_type.value,
            updated_at: new Date()
        }
        ApiService.postData(
            assetEndpoint, 
            newAssetType, 
            this.context.updateData, 
            this.context.hideModal
        )
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.context.id
        let updatedContent = {}
        if(e.target.asset_type.value !== ''){
            updatedContent.assettdesc = e.target.asset_type.value
        }
        ApiService.updateDataHalf(assetEndpoint, id, updatedContent)
        .then(res => {
            ApiService.getDataHalf(assetEndpoint)
                .then(data => {
                    this.context.setData(data)
                    this.context.hideUpdate()
                })
        })
        .catch(error => {
            console.log(error)
        }) 
    }

    deleteAsset = (id) => {
        this.context.deleteData(id)
        ApiService.deleteData(
            assetEndpoint, 
            id, 
            this.context.setData
        )
        this.context.hideDelete()
    }

    render(){ 
        const context = this.context
        return (
            <>
                <DeleteModal
                    props={context}
                    endpoint={assetEndpoint}
                    deleteFn={this.deleteAsset}
                />
                <Modal className='update-modal' show={context.update}>
                    <div className='update-content'>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='asset_type'>
                                    <h3>Update {context.name}</h3>
                                </label>
                                <input
                                    id='asset_type'
                                    name='asset_type'
                                    type='text'
                                />
                            </div>
                            <SubmitButton className='submit-content' text='Update'/>
                        </form>
                    </div>
                    <button className='cancel-btn' onClick={context.hideUpdate}>Cancel</button> 
                </Modal>
                <Modal className='add-modal' show={context.show} >
                    <form 
                        className='add-content'
                        onSubmit={(e) => this.addAsset(e)}
                    >
                        <h3>Add an Asset Type</h3>
                        <div className='form-group'>
                            <label htmlFor='asset_type'></label>
                            <input 
                                id='asset_type'
                                name='asset_type'
                                type='text'
                                placeholder="Asset Type"
                            />
                        </div>
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <button className='cancel-btn' onClick={context.hideModal}>Cancel</button>
                </Modal>
                
                <div className='data-container'>
                    <h3>Asset Type</h3>
                    <button className='add-btn' onClick={context.showModal}>Add Asset Type</button>
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
                        {context.data.map(a => {
                            return (
                            <tr key={a.id}>
                                <td>{a.assettdesc}</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{a.created_at}</Moment>
                                </td>
                                <td>
                                    <button className='update-btn' onClick={() => context.updateUpdate(a.assettdesc, a.id)}>Update</button>
                                </td>
                                <td>
                                    <button className='delete-btn' onClick={() => context.updateDelete(a.assettdesc, a.id)}>Delete</button>
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