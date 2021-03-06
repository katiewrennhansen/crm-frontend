import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import BrokerContext from '../../../../../contexts/BrokerContext'
import Features from '../../../../utilities/PropertyComponents/Features'
import Messages from '../../../../utilities/PropertyComponents/Messages'
import Maintenance from '../../../../utilities/PropertyComponents/Maintenance'
import Cost from '../../../../utilities/PropertyComponents/Cost'
import PropertyInfo from '../../../../utilities/PropertyComponents/PropertyInfo'
import ErrorBoundary from '../../../../utilities/ErrorBoundary'
import ContractHistory from '../../../../utilities/PropertyComponents/ContractHistory'

class SingleProperty extends Component {
    static contextType = BrokerContext
    constructor(props){
        super(props)
        this.state = {
            error: null,
            active: ''
        }
    }

    componentDidMount(){
        if(this.props.history.location.pathname === `/user/properties/${this.props.id}`){
            this.setState({
                active: 'features'
            }) 
        } else {
            this.setActive()
        }
    }

    setActive = (value) => {
        const urlArray = this.props.history.location.pathname.split('/')
        const urlValue = urlArray[urlArray.length - 1]
        if(value === undefined || ''){
            this.setState({
                active: urlValue
            })
        } else {
            this.setState({
                active: value
            })
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
                    <Link to={`/user/properties/${this.props.id}/`} onClick={() => this.setActive('features')}>
                        <h4>Features</h4>
                        <div className={(this.state.active === 'features' ? 'underline active' : 'underline')}></div>
                    </Link>
                    <Link to={`/user/properties/${this.props.id}/messages`} onClick={() => this.setActive('messages')}>
                        <h4>Messages</h4>
                        <div className={(this.state.active === 'messages' ? 'underline active' : 'underline')}></div>
                    </Link>
                    <Link to={`/user/properties/${this.props.id}/maintenance`} onClick={() => this.setActive('maintenance')}>
                        <h4>Maintenance</h4>
                        <div className={(this.state.active === 'maintenance' ? 'underline active' : 'underline')}></div>
                    </Link>
                    <Link to={`/user/properties/${this.props.id}/costs`} onClick={() => this.setActive('cost')}>
                        <h4>Transactions</h4>
                        <div className={(this.state.active === 'cost' ? 'underline active' : 'underline')}></div>
                    </Link>
                    <Link to={`/user/properties/${this.props.id}/contract-history`} onClick={() => this.setActive('contract-history')}>
                        <h4>Contract History</h4>
                        <div className={(this.state.active === 'contract-history' ? 'underline active' : 'underline')}></div>
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
                            <Maintenance 
                                id={this.props.id} 
                                type="user"    
                            />
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

                <Route 
                    exact path={`/user/properties/${this.props.id}/contract-history`}
                    render={props => (
                        <ErrorBoundary>
                            <ContractHistory id={this.props.id} />
                        </ErrorBoundary>
                    )}
                />
            </div>
        )
    }
}

export default SingleProperty