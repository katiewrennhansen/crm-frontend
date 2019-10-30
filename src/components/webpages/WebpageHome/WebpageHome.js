import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import HomePageSearch from '../HomePageSearch/HomePageSearch'
import './WebpageHome.css'
import MainNav from '../../navigation/Headers/MainNav/MainNav'
import Footer from '../../navigation/Footer/Footer'

class WebpageHome extends Component {
    render(){
        return (
            <>
                <MainNav 
                    authenticated={this.props.authenticated} 
                    logout={this.props.logout} 
                />
                <div className='webpage-home'>
                    <div className='background-image'>
                        <div className='search-container'>
                            <HomePageSearch history={this.props.history}/>
                        </div>
                    </div>
                    <div className='featured-properties'>
                        <h2>Propiedades Destacadas</h2>
                    </div>
                    <div className='services'>
                        <h2>Servicios</h2>
                        <div className='services-cards'>
                            <div className='tile'>
                                <h3>Servicios Corporativos</h3>
                                <p>Asesoramiento integral a empresas. Sabemos que no es tarea sencilla para las compañías encontrar un lugar apropiado para alojar a los ejecutivos que llegan desde el exterior, ayudarles en esta búsqueda es el principal objetivo de ApartmentChile.</p>
                            </div>
                            <div className='tile'>
                                <h3>Servicio de Administración</h3>
                                <p>Apartmentchile ofrecerá la gestión en el pago de las cuentas de los diferentes servicios que llegan al departamento como también gastos comunes, arriendos. Mensualmente se hará un informe donde se detallara los gastos adjuntando boletas, para el posterior pago.</p>
                            </div>
                            <div className='tile'>
                                <h3>Servicio de Mucamas</h3>
                                <p>A  través de ApartmenChile podrá contratar un servicio de mucama, donde personal de nuestra empresa realizara el aseo del departamento, diariamente o dias a convenir. Estos servicios son adicionales al arriendo se contratan directamente con Servicios Inmobiliarios Apartmentchile, se cancelan mensualmente.</p>
                            </div>
                        </div>
                        <div className='services-button'>
                            <Link to='/services'>
                                <button>Aprende Más</button>
                            </Link>
                        </div>
                    </div>
                    <div className='company'>
                        <div className='company-content'>
                            <h2>La Empresa</h2>
                            <p>Está conformada por un equipo de profesionales con amplia experiencia en servicio inmobiliario. Ofrecemos departamentos totalmente amoblados y equipados, de diferente categorías y precios, con oferta en las comunas de La Dehesa, Vitacura, Las Condes, Providencia, Ñuñoa y Santiago Centro. Departamentos de veraneo en Viña del Mar y otros.</p>
                        </div>
                        <div>
                            <img className='company-image' src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2784&q=80" alt='company' />
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default WebpageHome