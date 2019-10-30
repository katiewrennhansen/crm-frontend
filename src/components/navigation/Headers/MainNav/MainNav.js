import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './MainNav.css'
import NavLinks from '../../NavLinks/NavLinks'
 
class MainNav extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            usertype: '',
            redirect: false,
            authenticated: false
        }

    }

    
    render() {
        return (
            <nav>
                <div className='logo'>
                    <Link to="/" style={{color: '#343434', textDecoration: 'none'}}>
                        <h2>Apartment<span className='color'>Chile</span></h2>
                    </Link>
                </div>
                <div className='collapsed-content'>
                    <NavLinks />
                </div>
                <div className='login-nav'>
                    {(this.props.authenticated) 
                        ?
                        <>
                            <Link to='/dashboard' style={{textDecoration: 'none'}}>
                                <p className='account'>Account</p>
                            </Link>
                            <button 
                                className='logout' 
                                onClick={this.props.logout}
                                >Logout
                            </button>
                        </>
                        :
                        <>
                            <Link to="/login" style={{textDecoration: 'none'}}>
                                <p className='login'>Login</p>
                            </Link>
                            <Link to="/register" style={{textDecoration: 'none'}}>
                                <p className='register'>Register</p>
                            </Link>
                        </>
                    }
                </div>                    
            </nav>
        )
    }
}

export default MainNav
