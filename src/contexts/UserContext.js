import React  from 'react'

const UserContext = React.createContext({
    active: false,
    singleAsset: {},
    toggleNav: () => {},
    setSingleAsset: () => {},
})

export default UserContext

