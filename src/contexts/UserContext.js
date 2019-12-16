import React  from 'react'

const UserContext = React.createContext({
    active: false,
    toggleNav: () => {}
})

export default UserContext

