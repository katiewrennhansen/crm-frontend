import React, { Component } from 'react'
import cuuid from 'cuuid'
import ADMIN_DATA from '../../../../../admin-data'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'


class CompanySetUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false
        };
    }

    render(){
        return (
            <div>Company SetUp Page</div>
        )
    }
}

export default CompanySetUp