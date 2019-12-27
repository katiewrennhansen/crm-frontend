import React, { Component } from 'react'
import BrokerContext from '../../../../../contexts/BrokerContext'
import Features from '../../../../utilities/PropertyComponents/Features'
import Messages from '../../../../utilities/PropertyComponents/Messages'
import Maintenance from '../../../../utilities/PropertyComponents/Maintenance'
import Cost from '../../../../utilities/PropertyComponents/Cost'
import PropertyInfo from '../../../../utilities/PropertyComponents/PropertyInfo'
import ErrorBoundary from '../../../../utilities/ErrorBoundary'

class SingleProperty extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            error: null,
        }
    }

    render(){
        return (
            <div className="single-property-container">
                <ErrorBoundary>
                    <PropertyInfo 
                        id={this.props.id}
                        type='user'
                    />
                </ErrorBoundary>
                <ErrorBoundary>
                    <Features 
                        id={this.props.id}
                    />
                </ErrorBoundary>
                <ErrorBoundary>
                    <Messages 
                        id={this.props.id}
                    />
                </ErrorBoundary>
                <ErrorBoundary>
                    <Maintenance
                        id={this.props.id}
                    />
                </ErrorBoundary>
                <ErrorBoundary>
                <Cost
                        id={this.props.id}
                        setCosts={this.setCosts}
                    />
                </ErrorBoundary>
            </div>
        )
    }
}

export default SingleProperty