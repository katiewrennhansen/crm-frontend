import React, { Component } from 'react'
import './ServicesPage.css'
import MainNav from '../../navigation/Headers/MainNav/MainNav'
import Footer from '../../navigation/Footer/Footer'

class ServicesPage extends Component {
    render(){
        return (
            <>
            <MainNav 
                authenticated={this.props.authenticated} 
                logout={this.props.logout} 
            />
            <div className='services-page'>
                <div className='services-background-image-container'>
                <h1>Servicios</h1>
                </div>
                <div className='services-content'>                
                    <div className='service'>
                        <h2>Servicios Corperativos</h2>
                        <p>Asesoramiento integral a empresas. Sabemos que no es tarea sencilla para las compañías encontrar un lugar apropiado para alojar a los ejecutivos que llegan desde el exterior, ayudarles en esta búsqueda es el principal objetivo de ApartmentChile.</p>
                        <p>Ofrecemos nuestro conocimiento en el mercado inmobiliario para encontrar un sitio agradable y seguro que cumpla con las expectativas de comodidad y confort que el recién llegado necesita para poder desarrollar sus tareas laborales y sociales en un nuevo país.</p>
                        <p>Para agilizar y mejorar la calidad de servicio tenemos un trato preferencial en cuanto a disponibilidad horaria para mostrar los departamentos, entregarlos o recibirlos.</p>
                        <p>nuestros servicios usted como empresa lograra dar apoyo a los profesionales que llegan a Chile.</p>
                        <p>Podrá contactarse con nosotros, y le enviaremos con antelación diferentes opciones de acuerdo a su requerimiento, indicando características de la propiedad, comuna, servicios, medios de locomoción, de esta manera podrán seleccionar las propiedades desean visitar. Se coordina día y hora, un ejecutivo de ApartmentChile pasara a buscarlo por el lugar de trabajo o hotel.</p>
                        <p>Una vez seleccionada la propiedad se toma la reserva o se hace el contrato de arriendo junto con inventario de los bienes muebles el cual se controlara tanto en la entrega como en la recepcion del departamento. La Propiedad se entregara en fecha y en forma convenida.</p>
                        <p>El contrato será enviado con antelación para revisión de la compañía y lo llevaremos a su oficina o a la notaria donde la firma esté registrada. </p>
                    </div>
                    <div className='service'>
                        <h2>Servicio de Administración</h2>
                        <p>Apartmentchile ofrecerá la gestión en el pago de las cuentas de los diferentes servicios que llegan al departamento como también gastos comunes, arriendos. Mensualmente se hará un informe donde se detallara los gastos adjuntando boletas, para el posterior pago.</p>
                    </div>
                    <div className='service'>
                        <h2>Servicio de Mucamas</h2>
                        <p>A través de ApartmenChile podrá contratar un servicio de mucama, donde personal de nuestra empresa realizara el aseo del departamento, diariamente o dias a convenir. Estos servicios son adicionales al arriendo se contratan directamente con Servicios Inmobiliarios Apartmentchile, se cancelan mensualmente.</p>
                    </div>
                    <div className='services-message'>
                        <p>Preguntas sobre nuestros servicios?</p>
                        <button>Enviar Mensaje</button>
                    </div>
                </div>
            </div>
            <Footer />
            </>
        )
    }
}

export default ServicesPage