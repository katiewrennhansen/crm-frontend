import React, { Component } from 'react'
// import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../contexts/AdminContext'
import DeleteModal from '../../pagecomponents/DeleteModal'

const promEndpoint = config.PROMOTIONS_ENDPOINT

class Promotions extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    componentDidMount(){
        ApiService.getData(
            promEndpoint, 
            this.context.setPromotions
        )
    }

    addPromotion = (e) => {
        e.preventDefault()
        const newPromotion = {
            typepromotion: e.target.promotion_name.value,
            totalcost: e.target.total_cost.value,
            startdate: e.target.promotion_start.value,
            duedate: e.target.promotion_end.value,
        }
        ApiService.postDataHalf(promEndpoint, newPromotion)
            .then(data => {
                ApiService.getDataHalf(promEndpoint)
                    .then(data => {
                        this.context.setPromotions(data)
                        this.context.hideModal()
                    })
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.context.id
        const updatedContent = {}

        if(e.target.promotion_name.value !== ''){
            updatedContent.typepromotion = e.target.promotion_name.value
        }
        if(e.target.promotion_start.value !== ''){
            updatedContent.startdate = e.target.promotion_start.value
        }
        if(e.target.promotion_end.value !== ''){
            updatedContent.duedate = e.target.promotion_end.value
        }
        if(e.target.total_cost.value !== ''){
            updatedContent.totalcost = Number(e.target.total_cost.value)
        }
        ApiService.updateDataHalf(promEndpoint, id, updatedContent)
            .then(data => {
                ApiService.getDataHalf(promEndpoint)
                    .then(data => {
                        this.context.setPromotions(data)
                        this.context.hideUpdate()
                    })
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    deletePromotion = (id) => {
        this.context.deletePromotions(id)
        ApiService.deleteData(
            promEndpoint, 
            id, 
            this.context.setPromotions
        )
        this.context.hideDelete()
    }

    render(){  
        const context = this.context
        return (
            <>
            <DeleteModal
                props={context}
                endpoint={promEndpoint}
                deleteFn={this.deletePromotion}
            />
                <Modal className='update-modal' show={context.update}>
                    <div className='update-modal-grid'>
                        <h3>Update {context.name}</h3>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='comment_type'></label>
                                <input
                                    id='comment_type'
                                    name='promotion_name'
                                    type='text'
                                    defaultValue={context.name}
                                />
                            </div>
                            <div className='dates'>
                                <div className='form-group'>
                                    <label htmlFor='promotion_start'></label>
                                    <input 
                                        id='promotion_start'
                                        name='promotion_start'
                                        type='date'
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='promotion_end'></label>
                                    <input 
                                        id='promotion_end'
                                        name='promotion_end'
                                        type='date'
                                    />
                                </div>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='promotion_cost'></label>
                                <input 
                                    id='total_cost'
                                    name='total_cost'
                                    type='number'
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
                        onSubmit={(e) => this.addPromotion(e)}
                    >
                        <h3>Add a Promotion</h3>
                        <div className='form-group'>
                            <label htmlFor='promotion_name'>Name</label>
                            <input 
                                id='promotion_name'
                                name='promotion_name'
                                type='text'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='promotion_start'>Start Date</label>
                            <input 
                                id='promotion_start'
                                name='promotion_start'
                                type='date'

                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='promotion_end'>End Date</label>
                            <input 
                                id='promotion_end'
                                name='promotion_end'
                                type='date'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='promotion_cost'>Total Cost</label>
                            <input 
                                id='total_cost'
                                name='total_cost'
                                type='number'
                            />
                        </div>
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <div className='cancel'>
                        <button onClick={context.hideModal}>Cancel</button>
                    </div>
                </Modal>
                <div className='data-container'>
                    <h3>Promotions</h3>
                    <button className='add-data' onClick={context.showModal}>Add Promotion</button>
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Total Cost</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {context.promotions.map(p => (
                            <tr key={p.data.id}>
                                <td>{p.data.typepromotion}</td>
                                <td>
                                    {p.data.startdate}
                                </td>
                                <td>
                                    {p.data.duedate}
                                </td>
                                <td>{this.props.formatPrice(p.data.totalcost)}</td>
                                <td className='update'>
                                    <button onClick={() => context.updateUpdate(p.data.typepromotion, p.data.id)}>Update</button>
                                </td>
                                <td className='delete'>
                                    <button onClick={() => context.updateDelete(p.data.typepromotion, p.data.id)}>Delete</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default Promotions