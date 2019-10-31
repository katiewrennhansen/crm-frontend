import React, { Component } from 'react'
import './Promotions.css'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'


class Promotions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    showModal = () => {
        this.setState({ show: true });
      };


    addPromotion(e){
        e.preventDefault()
        console.log('add promotions!!')
        this.setState({
            show: false,
        })
    }

    render(){  
        return (
            <>
            <Modal show={this.state.show} >
                <form className= 'add_promotions' onSubmit={(e) => this.addPromotion(e)}>
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
            </Modal>
            <div className='promotion-container'>
                <h3>Welcome to the Promotions page</h3>
                <SubmitButton 
                    text='add promotion' 
                    showModal={this.showModal}
                />
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Start Date</th>
                            <th>Expiration Date</th>
                            <th>Total Cost</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Festive Fall</td>
                            <td>8/2/2019</td>
                            <td>10/2/2019</td>
                            <td>$1,200</td>
                            <td><button>Update</button></td>
                            <td><button>Delete</button></td>
                        </tr>
                        <tr>
                            <td>Summer Special</td>
                            <td>6/10/2019</td>
                            <td>8/12/2019</td>
                            <td>$13,200</td>
                            <td><button>Update</button></td>
                            <td><button>Delete</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </>
        )
    }
}

export default Promotions