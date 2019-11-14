import React, { Component } from 'react'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'

class Promotions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false,
            promotions: [],
            error: null,
            pToDelete: []
        };
    }

    removePromotion = id => {
        const newPromotions = this.state.promotions.filter(p =>
          p.data.id !== id
        )
        this.setState({
          promotions: newPromotions
        })
        this.props.func.hideDelete()
      }
    
    setPromotions = promotions => {
        this.setState({
            promotions: promotions,
            error: null
        })
    }

    updatePromotions = data => {
        this.setState({
            promotions: [...this.state.promotions, data],
            error: null
        })
    }

    componentDidMount(){
        fetch(config.PROMOTIONS_ENDPOINT, {
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
            this.setPromotions(data.promotions)
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    addPromotion = (e) => {
        e.preventDefault()
        const newPromotion = {
            typepromotion: e.target.promotion_name.value,
            totalcost: e.target.total_cost.value,
            startdate: this.formatDatePicker(e.target.promotion_start.value),
            duedate: this.formatDatePicker(e.target.promotion_end.value),
            company_id: 6,
            user_id: 1
        }
        fetch(config.PROMOTIONS_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(newPromotion),
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
            const promotion = {
                data
            }
            this.updatePromotions(promotion)
            this.props.func.hideModal()
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    render(){  
        const promo = this.props.func
        return (
            <>
                <Modal className='add-modal' show={promo.show} >
                    <form 
                        className='add-content' 
                        onSubmit={(e) => this.addPromotion(e)}
                    >
                        <h3>Add a Promotion</h3>
                        <div className='form-group'>
                            <label htmlFor='promotion_name'></label>
                            <TextInput 
                                id='promotion_name'
                                name='promotion_name'
                                label='Promotion Name'
                                type='text'
                                autoComplete='text'
                            />
                        </div>
                        <div className='dates'>
                            <div className='form-group'>
                                <label htmlFor='promotion_start'></label>
                                <TextInput 
                                    id='promotion_start'
                                    name='promotion_start'
                                    label='Start Date'
                                    type='date'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='promotion_end'></label>
                                <TextInput 
                                    id='promotion_end'
                                    name='promotion_end'
                                    label='End Date'
                                    type='date'
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='promotion_cost'></label>
                            <TextInput 
                                id='total_cost'
                                name='total_cost'
                                label='Total Cost'
                                type='number'
                                autoComplete='number'
                            />
                        </div>
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <div className='cancel'>
                        <button onClick={promo.hideModal}>Cancel</button>
                    </div>
                </Modal>
                <div className='data-container'>
                    <h3>Promotions</h3>
                    <button className='add-data' onClick={promo.showModal}>Add Promotion</button>
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
                            {this.state.promotions.map(p => (
                            <tr key={p.data.id}>
                                <td>{p.data.typepromotion}</td>
                                <td>{promo.formatDate(p.data.startdate)}</td>
                                <td>{promo.formatDate(p.data.duedate)}</td>
                                <td>{this.props.formatPrice(p.data.totalcost)}</td>
                                <td className='update'>
                                    <button>Update</button>
                                </td>
                                <td className='delete'>
                                    <button 
                                        onClick={() => promo.updateDelete(p.data.typepromotion, p.data.id)}
                                    >
                                        Delete
                                    </button>
                                    {(promo.delete) ? promo.deleteModal(config.PROMOTIONS_ENDPOINT, this.removePromotion) : null}
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