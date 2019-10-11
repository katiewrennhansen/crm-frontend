import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './MainNav.css'
 
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
                <div className='logo'>
                    <Link to="/" style={{color: '#343434', textDecoration: 'none'}}>
                        <h2>Apartment<span className='color'>Chile</span></h2>
                    </Link>
                </div>
                <div className='collapsed-content'>
                    <Link to="/" style={{textDecoration: 'none'}}>
                        <p className='link'>Home</p>
                    </Link>
                    <Link to="/about" style={{textDecoration: 'none'}}>
                        <p className='link'>About</p>
                    </Link>
                    <Link to="/services" style={{textDecoration: 'none'}}>
                        <p className='link'>Services</p>
                    </Link>
                    <Link to="/search" style={{textDecoration: 'none'}}>
                        <p className='link'>Search</p>
                    </Link>
                    <Link to="/contact" style={{textDecoration: 'none'}}>
                        <p className='link'>Contact</p>
                    </Link>
                </div>
                <div className='login-nav'>
                    {(this.props.authenticated) 
                        ?
                        <button 
                            className='logout' 
                            onClick={this.props.logout}
                            >Logout
                        </button>
                        :
                        <>
                            <Link to="/login" style={{textDecoration: 'none'}}>
                                <p className='login'>Login</p>
                            </Link>
                            <Link to="/select-account-type" style={{textDecoration: 'none'}}>
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