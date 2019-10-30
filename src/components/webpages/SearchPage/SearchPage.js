import React, { Component } from 'react'

import MainNav from '../../navigation/Headers/MainNav/MainNav'
import Footer from '../../navigation/Footer/Footer'

class SearchPage extends Component {
    render(){
        return (
            <>
                <MainNav 
                    authenticated={this.props.authenticated} 
                    logout={this.props.logout} 
                />
                <div>
                    <h1>This is the Seach Page</h1>
                </div>
                <Footer />
            </>
        )
    }
}

export default SearchPage