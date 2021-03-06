import React, { Component } from 'react'
import Moment from 'react-moment'
import Modal from '../../../../utilities/Modal/Modal'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../contexts/AdminContext'
import DeleteModal from '../../../../utilities/Modal/DeleteModal'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

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
        e.target.asset_type.value = ""
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
        e.target.asset_type.value = ""
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
                    <CloseIcon 
                        className="close-icon" 
                        onClick={context.hideUpdate}
                    />
                    <div className='update-content'>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='asset_type'>
                                    <h3>Update: {context.name}</h3>
                                </label>
                                <input
                                    id='update_asset_type'
                                    name='asset_type'
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
                        className='add-content'
                        onSubmit={(e) => this.addAsset(e)}
                    >
                        <h3>Add an Asset Type</h3>
                        <div className='form-group'>
                            <label htmlFor='asset_type'></label>
                            <input 
                                id='add_asset_type'
                                name='asset_type'
                                type='text'
                                placeholder="Asset Type"
                            />
                        </div>
                        <input type="submit" className="submit-full submit-modal" value="Add" />
                    </form>
                </Modal>
                
                <div className='data-container'>
                    <h2>Asset Type</h2>
                    <AddIcon 
                        className="add-icon" 
                        aria-label="add comment type" 
                        onClick={context.showModal} 
                    />                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date Created</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(context.data[0])
                            ? context.data.map(a => {
                                return (
                                <tr key={a.id}>
                                    <td>{a.assettdesc}</td>
                                    <td>
                                        <Moment format="YYYY/MM/DD">{a.created_at}</Moment>
                                    </td>
                                    <td>
                                        <button className='update-btn' onClick={() => context.updateUpdate(a.assettdesc, a.id)}>
                                            <EditIcon />
                                        </button>
                                    </td>
                                    <td>
                                        <button className='delete-btn' onClick={() => context.updateDelete(a.assettdesc, a.id)}>
                                            <DeleteOutlineIcon />
                                        </button>
                                    </td>
                                </tr>
                            )})
                            :<tr>
                                <td className="nothing-to-display">No Asset Types to Display</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        }
                        </tbody>
                    </table>
                    <p className="entry-count">Showing {context.data.length} of {context.data.length} entries</p>
                </div>
            </>
        )
    }
}



export default AssetType