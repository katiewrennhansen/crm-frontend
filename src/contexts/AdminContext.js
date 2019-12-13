import React  from 'react'

const AdminContext = React.createContext({
    show: false,
    delete: false,
    update: false,
    data: [],
    promotions: [],
    process: [],
    error: null,
    toUpdate: {
        name: '',
        id: ''
    },
    toDelete: {
        name: '',
        id: ''
    },
    active: false,
    showModal: () => {},
    hideModal: () => {},
    showDelete: () => {},
    hideDelete: () => {},
    showUpdate: () => {},
    hideUpdate: () => {},
    updateUpdate: () => {},
    updateDelete: () => {},
    setData: () => {},
    updateData: () => {},
    setPromotions: () => {},
    updatePromotions: () => {},
    setProcess: () => {},
    deleteData: () => {},
    deletePromotions: () => {},
    deleteProcess: () => {},
    toggleNav: () => {}
})

export default AdminContext

