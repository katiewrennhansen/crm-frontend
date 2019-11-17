import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../AdminContext'
import DeleteModal from '../../pagecomponents/DeleteModal'

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

    componentDidUpdate(){
        ApiService.getData(
            assetEndpoint, 
            this.context.setData
            )        
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
        ApiService.updateData(
            assetEndpoint, 
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
                    endpoint={assetEndpoint}
                />
                <Modal className='update-modal' show={context.update}>
                    <div className='update-modal-grid'>
                        <h3>Update {context.name}</h3>
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
                            <button onClick={context.hideUpdate}>Cancel</button>   
                        </div>
                    </div>
                </Modal>
                <Modal className='add-modal' show={context.show} >
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
                        <button onClick={context.hideModal}>Cancel</button>
                    </div>
                </Modal>
                
                <div className='data-container'>
                    <h3>Asset Type</h3>
                    <button className='add-data' onClick={context.showModal}>Add Asset Type</button>
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
                                <td className='update'>
                                    <button onClick={() => context.updateUpdate(a.assettdesc, a.id)}>Update</button>
                                </td>
                                <td className='delete'>
                                    <button onClick={() => context.updateDelete(a.assettdesc, a.id)}>Delete</button>
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