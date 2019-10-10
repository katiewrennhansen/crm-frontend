import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import RegistrationForm from '../RegistrationForm/RegistrationFrom'
import './UserRegistration.css'

class UserRegistration extends Component {
  
    // state = {
    //     user: {}
    // }
    
    

    // updateState(e){
    //     const { name, value } = e.target
    //     this.setState({
    //         user: {
    //             [name]: value,
    //         }
            
    //     })
    // }

    handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            "user": {
                "firstname": e.target.firstname.value,
                "lastname": e.target.lastname.value,
                "email": e.target.email.value,
                "country": e.target.country.value,
                "phone": e.target.phone.value,
                "usertype": "user",
                "company_id": 1,
                "password": e.target.password.value,
            }
        }

        //THIS IS IMPORTANT
        const url = 'https://crmmia.herokuapp.com/api/users'
        const options = {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

        console.log('registered new user')
        //Redirect to new
        this.props.history.push('/login');
    }


    render(){
        return (
            <div className='user-registration-container'>
                <h1>Create a user account to start the renting process</h1>
                <div className='user-registration-content'>
                    <RegistrationForm 
                        handleSubmit={this.handleSubmit}
                        updateState={this.updateState}
                    />
                    <p>
                        Already have an account?&nbsp;  
                        <Link to='/login' style={{color: 'lightgreen'}}>
                            Login now!
                        </Link>
                    </p>
                </div>
            </div>
        )
    }
}

export default UserRegistration