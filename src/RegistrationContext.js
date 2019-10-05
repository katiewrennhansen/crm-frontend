import React from 'react'

const RegistrationContext = React.createContext({
    registerUser: {
        first: '',
        last: '',
        email: '',
        phone: '',
        country: '',
        password: '',
        repeatPassword: ''
    }
})

export default RegistrationContext