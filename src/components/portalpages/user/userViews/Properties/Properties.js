import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'
import UserContext from '../../../../../contexts/UserContext'
import AddIcon from '@material-ui/icons/Add';
import PropertyCard from '../../../../utilities/PropertyComponents/PropertyCard'

class Properties extends Component {
    static contextType = UserContext

    constructor(props){
        super(props)
        this.state = {
            assets: []
        }
    }
    
    setAssets = assets => {
        this.setState({
            assets
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/assets`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                console.log(data)
                this.setAssets(data.assets)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return (
            <div className='broker-properties'>
                <div className='header-grid'>
                    <h2>My Listings</h2>
                    <Link className="add-icon" to='/user/properties/add'>
                        <AddIcon 
                            className="action-icon" 
                            aria-label="add property" 
                        />
                    </Link>
                </div>
                <div className='broker-properties-grid'>
                    {(this.state.assets[0])
                    ? this.state.assets.map(a => {
                        return (
                            <div key={a.id}>
                                <PropertyCard
                                    property={a}
                                    type='user'
                                />
                            </div>
                        )
                    })
                    :
                    <p className="nothing-to-display">Click the + icon to add a new listing</p>
                    }
                </div>
            </div>
        )
    }
}

export default Properties