import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './MainNav.css'
import NavLinks from '../../NavLinks/NavLinks'
import TokenService from '../../../../../services/token-service'
 
class MainNav extends Component {
    constructor(props){
        super(props)
        this.state = {
            usertype: '',
        }
    }

    logout = () => {
        console.log('logged out');
        TokenService.clearAuthToken()
    }

    accountType = (usertype) => {
        if(usertype === 'admin'){
            return '/dashboard'
        } else if (usertype === 'broker'){
            return '/broker'
        } else if (usertype === 'user'){
            return '/user'
        }  
    }
    
    render() {
        const usertype = sessionStorage.getItem('usertype')
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
                    {(TokenService.hasAuthToken()) 
                        ?
                        <>
                            <Link to={this.accountType(usertype)} style={{textDecoration: 'none'}}>
                                <p className='account'>Account</p>
                            </Link>
                            <Link to='/' 
                                className='logout' 
                                style={{textDecoration: 'none'}}
                                onClick={this.logout}
                                >Logout
                            </Link>
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
