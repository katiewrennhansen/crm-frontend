import React  from 'react'

const BrokerContext = React.createContext({
    assets: [],
    singleAsset: [],
    active: false,
    highlighted: '',
    setAssets: () => {},
    setSingleAsset: () => {},
    toggleNav: () => {},
    setHiglighted: () => {}
})

export default BrokerContext

