import React, { Component } from 'react'
import MainNav from '../Headers/MainNav/MainNav'

class WebpageHome extends Component {
    render(){
        return (
            <div>
                <header>
                    <MainNav />
                </header>
                <h1>Main Content Here</h1>
            </div>
        )
    }
}

export default WebpageHome