import React, { Component } from 'react'
import './Promotions.css'
import cuuid from 'cuuid'
import ADMIN_DATA from '../../../../../admin-data'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'


let data = ADMIN_DATA.promotions;


class Promotions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false
        };
    }
    
    formatDatePicker(date){
        const dateArr = date.split('-')
        let newDateArr = []
        for(let i = 0; i < dateArr.length; i++){
           newDateArr.push(dateArr[dateArr.length - 1 - i])
        }
        return newDateArr.join('/')
    }

    formatPriceUSD(amount) {
        const thousands = ","
        let i = parseInt(amount = Math.abs(Number(amount) || 0)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;
        console.log(i)
        console.log(j)
      
        return "$" + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands);
      }


    addPromotion = (e) => {
        e.preventDefault()
        console.log('add promotions!!')
        const newPromotion = {
            promotion: {
                typepromotion: e.target.promotion_name.value,
                totalcost: `${this.formatPriceUSD(e.target.total_cost.value)}`,
                startdate: this.formatDatePicker(e.target.promotion_start.value),
                duedate: this.formatDatePicker(e.target.promotion_end.value),
                company_id: 6,
                user_id: 1,
                id: cuuid()
            }
        }
        data.push(newPromotion)
    }

    deletePromotion = (id) => {
        data = data.filter(c => {
            return c.promotion.id !== id
        })
        this.props.hideDelete();
    }

    render(){  
        return (
            <>
                <Modal show={this.props.show} >
                    <form className= 'add_promotions' onSubmit={(e) => {this.addPromotion(e); this.props.hideModal();}}>
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
                        <SubmitButton className='submit_promotions' text='Save'/>
                    </form>
                    <button onClick={this.props.hideModal}>Cancel</button>
                </Modal>
                <div className='promotion-container'>
                    <h3>Promotions</h3>
                    <button className='add_promotion' onClick={this.props.showModal}>Add Promotion</button>
                    <table className='promotion_table'>
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
                            {data.map(p => (
                            <tr key={p.promotion.id}>
                                <td>{p.promotion.typepromotion}</td>
                                <td>{p.promotion.startdate}</td>
                                <td>{p.promotion.duedate}</td>
                                <td>{p.promotion.totalcost}</td>
                                <td><button>Update</button></td>
                                <td className='delete'><button onClick={() => this.deletePromotion(p.promotion.id)}>Delete</button>
                                    {/* <Modal show={this.props.delete}>
                                        <h3>
                                            Are you sure you would like to delete this promotion?
                                        </h3>
                                        <button onClick={this.props.hideDelete}>Cancel</button>
                                        <div className='delete'>
                                            <button onClick={() => this.deletePromotion(p.promotion.id)}>Delete</button>
                                        </div>
                                    </Modal> */}
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