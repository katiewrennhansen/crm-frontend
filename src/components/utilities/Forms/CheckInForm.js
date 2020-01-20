import React, { Component } from 'react'
import ApiService from '../../../services/api-service'
import config from '../../../config'
import '../../portalpages/broker/brokerViews/Properties/Properties.css'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

class CheckInForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            asset: [],
            signature: '',
            date: ''
        }
    }

    setAsset = asset => {
        this.setState({
            asset
        })
    }

    handleChange = ({ target: {value, name }}) => this.setState({ [name]: value })

    componentDidMount(){
        ApiService.getDataHalf(`${config.API_ENDPOINT}/assets/${this.props.id}`)
            .then(data => {
                this.setAsset(data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    printDocument(e) {
        e.preventDefault()
        const input = document.getElementById('divToPrint');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
            console.log(pdf)
          })
        ;
      }

    render(){
        return (
            <div>
            <form className="add-property-form" onSubmit={(e) => this.printDocument(e)}>
                <div className="inner-form-content">
                <p>Please review the following information carefully before signing.</p>
                <div id="divToPrint" className="mt4">
                    <h3>{this.state.asset.adescription4}</h3>

                    <div className="form-group row" >
                        <div>
                            <label htmlFor="signature">Signature<span className="required">*</span></label>
                            <input type="text" name="signature" onChange={this.handleChange} required></input>
                        </div>
                        <div>
                            <label htmlFor="date">Date<span className="required">*</span></label>
                            <input type="date" name="date" onChange={this.handleChange} required></input>
                        </div>
                    </div>
                    </div>
                    <input type="submit" class="submit" />
                </div>
            </form>
            </div>
        )
    }
}

export default CheckInForm