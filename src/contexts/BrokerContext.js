import React  from 'react'

const BrokerContext = React.createContext({
    assets: [],
    singleAsset: [],
    setAssets: () => {},
    setSingleAsset: () => {}
})

export default BrokerContext

