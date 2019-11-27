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
    deleteData: () => {}
})

export default AdminContext


// export class AdminProvider extends Component {
//     state = {
//         show: false,
//         delete: false,
//         update: false,
//         data: [],
//         promotions: [],
//         process: [],
//         error: null,
//         toUpdate: {
//             name: '',
//             id: ''
//         },
//         toDelete: {
//             name: '',
//             id: ''
//         },
//     };

//     showModal = () => {
//         this.setState({ show: true });
//     };

//     hideModal = () => {
//         this.setState({ show: false });
//     };

//     showDelete = () => {
//         this.setState({ delete: true });
//     };

//     hideDelete = () => {
//         this.setState({ delete: false });
//     }

//     showUpdate = () => {
//         this.setState({ update: true });
//     };

//     hideUpdate = () => {
//         this.setState({ update: false });
//     }

//     updateUpdate = (name, id) => {
//         this.showUpdate();
//         this.setState({ 
//             toUpdate: {
//                 name: name,
//                 id: id
//             } 
//         }); 
//     };

//     updateDelete = (name, id) => {
//         this.showDelete();
//         this.setState({ 
//             toDelete: {
//                 name: name,
//                 id: id
//             } 
//         }); 
//     };

//     setData = data => {
//         this.setState({
//             data: data
//         })
//     }

//     updateData = newData => {
//         this.setState({
//             data: [...this.state.data, newData],
//             error: null
//         })
//     }
    
//     setPromotions = data => {
//         this.setState({
//             promotions: data.promotions,
//             error: null
//         })
//     }
    
//     updatePromotions = data => {
//         this.setState({
//             promotions: [...this.state.promotions, data],
//             error: null
//         })
//     }

//     setProcess = data => {
//         const process = data.processts        
//         this.setState({
//             process: process,
//             error: null
//         })
//     }

//     render() {
//         const value = {
//             show: this.state.show,
//             delete: this.state.delete,
//             update: this.state.update,
//             data: this.state.data,
//             promotions: this.state.promotions,
//             process: this.state.process,
//             name: this.state.toUpdate.name,
//             id: this.state.toUpdate.id,
//             nameDelete: this.state.toDelete.name,
//             idDelete: this.state.toDelete.id,
//             showModal: this.showModal,
//             hideModal: this.hideModal,
//             showDelete: this.showDelete,
//             hideDelete: this.hideDelete,
//             showUpdate: this.showUpdate,
//             hideUpdate: this.hideUpdate,
//             updateUpdate: this.updateUpdate,
//             updateDelete: this.updateDelete,
//             setData: this.setData,
//             updateData: this.updateData,
//             setPromotions: this.setPromotions,
//             updatePromotions: this.updatePromotions,
//             setProcess: this.setProcess,

//         }
//         return (
//           <AdminContext.Provider value={value}>
//             {this.props.children}
//           </AdminContext.Provider>
//         )
//       }
// }
