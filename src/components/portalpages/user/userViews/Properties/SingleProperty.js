import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
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

                <nav className="property-nav">
                    <Link to={`/user/properties/${this.props.id}/`}>
                        <h4>Features</h4>
                    </Link>
                    <Link to={`/user/properties/${this.props.id}/messages`}>
                        <h4>Messages</h4>
                    </Link>
                    <Link to={`/user/properties/${this.props.id}/maintenance`}>
                        <h4>Maintenance</h4>
                    </Link>
                    <Link to={`/user/properties/${this.props.id}/costs`}>
                        <h4>Costs</h4>
                    </Link>
                </nav>

                <Route 
                    exact path={`/user/properties/${this.props.id}/`}
                    render={props => (
                        <ErrorBoundary>
                            <Features id={this.props.id} />
                        </ErrorBoundary>
                    )}
                />

                <Route 
                    exact path={`/user/properties/${this.props.id}/messages`}
                    render={props => (
                        <ErrorBoundary>
                            <Messages id={this.props.id} />
                        </ErrorBoundary>
                    )}
                />

                <Route 
                    exact path={`/user/properties/${this.props.id}/maintenance`}
                    render={props => (
                        <ErrorBoundary>
                            <Maintenance id={this.props.id} />
                        </ErrorBoundary>
                    )}
                />

                <Route 
                    exact path={`/user/properties/${this.props.id}/costs`}
                    render={props => (
                        <ErrorBoundary>
                            <Cost id={this.props.id} />
                        </ErrorBoundary>
                    )}
                />
            </div>
        )
    }
}

export default SingleProperty