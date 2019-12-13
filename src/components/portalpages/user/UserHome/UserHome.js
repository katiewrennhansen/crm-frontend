import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class UserHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            assets: [],
            singleAsset: []
        }
    }

    setAssets = (assets) => {
        this.setState({
            assets: assets
        })
    }

    setSingleAsset = (asset) => {
        this.setState({
            singleAsset: asset
        })
    }

    handleTitle = (title) => {
        this.setState({
            title: title
        })
    }
    
    render(){
        // const value = {
        //     assets: this.state.assets,
        //     singleAsset: this.state.singleAsset,
        //     setAssets: this.setAssets,
        //     setSingleAsset: this.setSingleAsset
        // }
        return (
         <div>User Home</div>
        )
    }
}

export default withRouter(UserHome)