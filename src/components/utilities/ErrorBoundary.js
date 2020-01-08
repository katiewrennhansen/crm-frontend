import React, { Component } from 'react'


class ErrorBoundary extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null
        }
    }

    static getDerivedStateFromError(error){
        return { error: true }
    }

    componentDidCatch(error, errorInfo){
        console.log(error)
        console.log(errorInfo)
    }


    render(){
        if(this.state.error) {
            return (
                <p className="error">Unable to load</p>
                )
        }
        return this.props.children
    }
}

export default ErrorBoundary