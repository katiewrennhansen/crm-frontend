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
    deleteProcess: () => {}
})

export default AdminContext

