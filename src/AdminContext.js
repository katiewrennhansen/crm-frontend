import React, { Component } from 'react'

const AdminContext = React.createContext({
    show: false,
    delete: false,
    update: false,
    data: [],
    promotions: [],
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
    removeData: () => {},
    setPromotions: () => {},
    removePromotion: () => {},
    updatePromotions: () => {}
})

export default AdminContext


export class AdminProvider extends Component {
    state = {
        show: false,
        delete: false,
        update: false,
        data: [],
        promotions: [],
        error: null,
        toUpdate: {
            name: '',
            id: ''
        },
        toDelete: {
            name: '',
            id: ''
        },
    };

    showModal = () => {
        console.log('showing modal!!!')
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    showDelete = () => {
        this.setState({ delete: true });
    };

    hideDelete = () => {
        this.setState({ delete: false });
    }

    showUpdate = () => {
        this.setState({ update: true });
    };

    hideUpdate = () => {
        this.setState({ update: false });
    }

    updateUpdate = (name, id) => {
        this.showUpdate();
        this.setState({ 
            toUpdate: {
                name: name,
                id: id
            } 
        }); 
    };

    updateDelete = (name, id) => {
        this.showDelete();
        this.setState({ 
            toDelete: {
                name: name,
                id: id
            } 
        }); 
    };

    setData = data => {
        this.setState({
            data: data,
            error: null
        })
    }

    updateData = newData => {
        this.setState({
            data: [...this.state.data, newData],
            error: null
        })
    }

    removeData = id => {
        this.hideDelete();
        const newData = this.state.data.filter(d =>
          d.id !== id
        )
        this.setState({
          data: newData
        })
    }

    setPromotions = data => {
        const promotions = data.promotions
        this.setState({
            promotions: promotions,
            error: null
        })
    }

    removePromotion = id => {
        const newPromotions = this.state.promotions.filter(p =>
          p.data.id !== id
        )
        this.setState({
          promotions: newPromotions
        })
        this.props.func.hideDelete()
      }
    
    updatePromotions = data => {
        this.setState({
            promotions: [...this.state.promotions, data],
            error: null
        })
    }
    
    render() {
        const value = {
            show: this.state.show,
            delete: this.state.delete,
            update: this.state.update,
            data: this.state.data,
            promotions: this.state.promotions,
            name: this.state.toUpdate.name,
            id: this.state.toUpdate.id,
            nameDelete: this.state.toDelete.name,
            idDelete: this.state.toDelete.id,
            showModal: this.showModal,
            hideModal: this.hideModal,
            showDelete: this.showDelete,
            hideDelete: this.hideDelete,
            showUpdate: this.showUpdate,
            hideUpdate: this.hideUpdate,
            updateUpdate: this.updateUpdate,
            updateDelete: this.updateDelete,
            setData: this.setData,
            updateData: this.updateData,
            removeData: this.removeData,
            setPromotions: this.setPromotions,
            removePromotion: this.removePromotion,
            updatePromotions: this.updatePromotions
        }
        return (
          <AdminContext.Provider value={value}>
            {this.props.children}
          </AdminContext.Provider>
        )
      }
}
