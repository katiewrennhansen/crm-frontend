import React, { Component } from 'react'
import { Link } from 'react-router-dom'
 
class MainNav extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            usertype: 'user',
            redirect: false,
            authenticated: false
        }

    }


    render() {
        return (
            <nav>
                <div className='login-nav'>
                    <Link to='/user-home' style={{textDecoration: 'none'}}>
                        <p className='account'>Account</p>
                    </Link>
                    <button 
                        className='logout' 
                        onClick={this.props.logout}
                        >Logout
                    </button>
                </div>                    
            </nav>
        )
    }
}

export default MainNav