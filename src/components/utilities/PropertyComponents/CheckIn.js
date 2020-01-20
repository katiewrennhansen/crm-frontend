import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import config from '../../../config'
import BrokerContext from '../../../contexts/BrokerContext'
import CloseIcon from '@material-ui/icons/Close';
import CheckInForm from '../Forms/CheckInForm'

class CheckIn extends Component {
    static contextType = BrokerContext

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            files: [],
            loading: false,
            radioValue: true
        }
    }

    fileSelectedHandler = (file) => {
        this.setState({
            files: [...file]
        })
    }

    removeImage = (file, index) => {
        let newPics = this.state.files
        newPics.splice(index, 1);
        this.setState({
            files: [...newPics]
        })
    }

    render(){
        return (
            <div className='add-property'>
                <div className='header-grid'>
                    <h2>Check In Form</h2>
                    <Link className="close-icon" to='/user/properties'>
                        <CloseIcon 
                            className="action-icon" 
                        />
                    </Link>
                </div>
                <div>
                    <CheckInForm 
                        id={this.props.id}
                    />
                </div>
            </div>
        )
    }
}

export default CheckIn