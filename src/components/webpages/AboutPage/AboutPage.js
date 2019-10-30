import React, { Component } from 'react'
import './AboutPage.css'
import MainNav from '../../navigation/Headers/MainNav/MainNav'
import Footer from '../../navigation/Footer/Footer'

class AboutPage extends Component {
    render(){
        return (
            <>
                <MainNav 
                    authenticated={this.props.authenticated} 
                    logout={this.props.logout} 
                />
                <div className='about-page'>
                    <div className='about-content'>
                        <h1>Quiénes Somos</h1>
                        <p>Queremos ser una empresa reconocida como líder en el sector inmobiliario de alta gama, ofreciendo propiedades que cubran las necesidades del mercado, enfocándonos siempre en el servicio al cliente creando un vínculo de honestidad y transparencia.</p>
                        <p>Nuestra misión es ofrecer la mejor calidad en gestión inmobiliaria. Entregando la mayor oferta en el mercado de propiedades amoblados, renovando constantemente nuestra cartera para asegurar nuestra competitividad dentro del mercado. Brindando la mejor atención a nuestros clientes, manteniendo un contacto frecuente con los mismos y asesorándolos en el proceso de gestión inmobiliaria para obtener los mejores resultados.</p>
                        <p>Es de suma importancia para nosotros el cumplimiento de plazos fijados y el dar respuestas agiles a las solicitudes de los clientes. También, encontrar una plusvalía para cada inmueble realizando así mejoras eficientes y a largo plazo.</p>
                        <p>Hemos conseguido posicionarnos en el mercado inmobiliario, especializándonos en arriendos de departamentos amoblados, rent-apart, por periodos que van desde días hasta meses. Gracias a nuestro trabajo responsable y dinámico, hemos logrado que importantes empresas confíen en nosotros y contraten de forma permanente nuestros servicios.</p>
                        
                        <h3>Algunos de nuestros objetivos son:</h3>
                        <ul>
                            <li>Trabajar en ofrecer la mejor atención a nuestros clientes.</li>
                            <li>Brindar toda la información necesaria para una gestión inmobiliaria exitosa.</li>
                            <li>Encontrar una plusvalía para cada inmueble.</li>
                            <li>Dar respuestas oportunas y agiles a las solicitudes.</li>
                            <li>Ser implacable en el cumplimiento de plazos.</li>
                            <li>Mantener contacto frecuente con nuestros clientes.</li>
                        </ul>
                        <h3>Sistema de Trabajo de ApartmentChile</h3>
                        <p>Seleccionamos los departamentos de acuerdo a categoría y ubicación. Funcionamos como corredores de propiedades. Nuestra comisión se designa dependiendo de cada periodo de arriendo realizado y se hace efectiva (pago) al momento de la firma de cada contrato. Las comisiones a cancelar fluctúan entre el 10% y el 50%, de acuerdo al tiempo de arriendo QUE DEBEN ABONAR ARRENDADOR Y ARRENDATARIO.</p>
                        <p>Ver Condiciones</p>
                    </div>
                    <div className='about-end'>
                        <div>
                            <img className='about-img' src='https://images.unsplash.com/photo-1494767980523-731d7e66b3a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80' alt='house' />
                        </div>
                        <div className='end-content'>
                            <h3>Administración de Arriendos</h3>
                            <p>La administración del inmueble: El pago de todas las cuentas del departamento (Agua, Luz, Gas, Gastos Comunes, Pago de Teléfono, Internet, TV cable y cualquier otro gasto que sea del departamento), este costo es de cargo de quien lo contrate, hacemos contratos, inventarios, entregamos y recibimos los departamentos, tratamos de estar siempre en contacto con las partes interesadas, para evitar cualquier tipo de conflicto, durante el tiempo que dure el contrato de arriendo. En caso que se desee la administración, el valor mensual es entre un 7% ó 10% dependiendo de las partes involucradas.</p>
                            <p>APARTMENTCHILE ofrece en arriendo la diversidad de departamentos con las que cuenta, a través de nuestro sitio www.apartmentchile.com  PORTAL INMOBILIARIO, EL INMOBILIARIO,  el Mercurio y de otros medios que estime convenientes, publicando fotografías, condiciones de arriendo, así como los valores previamente acordados con las partes involucradas.</p>
                            <p>Es por eso que le invitamos a contar con nuestro apoyo y poder colaborar con Ud. en la búsqueda de su propiedad.</p>
                            <p>Marcela Patti </p>
                            <p>Gerente General</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default AboutPage