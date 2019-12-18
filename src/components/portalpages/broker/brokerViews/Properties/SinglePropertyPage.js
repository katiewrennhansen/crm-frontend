import React, { Component } from 'react'
import Features from '../../../../utilities/PropertyComponents/Features'
import Messages from '../../../../utilities/PropertyComponents/Messages'
import Maintenance from '../../../../utilities/PropertyComponents/Maintenance'
import Cost from '../../../../utilities/PropertyComponents/Cost'
import PropertyInfo from '../../../../utilities/PropertyComponents/PropertyInfo'
import './Properties.css'


class SinglePageProperty extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null
        }
    }

    render(){
        return (
            <div className="single-property-container">
                <PropertyInfo 
                    id={this.props.id}
                    type='broker'
                />
                <Features 
                    id={this.props.id}
                />
                <Messages 
                    id={this.props.id}
                />
                <Maintenance
                    id={this.props.id}
                />
               <Cost
                    id={this.props.id}
                    setCosts={this.setCosts}
                />
            </div>
        )
    }
}

export default SinglePageProperty