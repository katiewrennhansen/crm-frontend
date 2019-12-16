import React  from 'react'

const BrokerContext = React.createContext({
    assets: [],
    singleAsset: [],
    active: false,
    setAssets: () => {},
    setSingleAsset: () => {},
    toggleNav: () => {}
})

export default BrokerContext

