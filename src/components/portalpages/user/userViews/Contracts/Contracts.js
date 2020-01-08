import React, { Component } from 'react'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

class Contracts extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            contracts: []
        }
    }

    viewFile = id => {
        console.log('file clicked')
    }

    render(){
        return (
             <div className='data-container'>
                <h2>Contracts</h2>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Date Issued</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        (this.state.contracts[0]) 
                        ?
                            this.state.contracts.map(c => {
                                return (
                                    <tr key={c.id}>
                                        <td>Date Issued</td>
                                        <td>Name</td>
                                        {/* <td>{(c.confirmatindate) ? `Completed ${c.requestdate}` : 'Pending'}</td>  */}
                                        <td>Status</td>
                                        <td className="action-icon">
                                            <InsertDriveFileIcon 
                                                onClick={this.viewFile}
                                                className="active-icon"
                                            />
                                        </td>                                       
                                    </tr>
                                )})
                            : ( <tr>
                                    <td>No Contracts to Display</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr> )
                        }
                    </tbody>
                </table>
                <p className="entry-count">Showing {this.state.contracts.length} of {this.state.contracts.length} entries</p>
            </div>
        )
    }
}

export default Contracts