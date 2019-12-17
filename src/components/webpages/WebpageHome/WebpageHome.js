import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import HomePageSearch from './HomePageSearch/HomePageSearch'
import MainNav from '../navigation/Headers/MainNav/MainNav'
import Footer from '../navigation/Footer/Footer'
import BusinessIcon from '@material-ui/icons/Business';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import property1 from '../../../images/property1.jpg'
import HotelIcon from '@material-ui/icons/Hotel';
import HotTubIcon from '@material-ui/icons/HotTub';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './WebpageHome.css'

class WebpageHome extends Component {
    render(){
        return (
            <div className="web-home">
                <MainNav 
                    logout={this.props.logout} 
                    history={this.props.history}
                />
                <div className='webpage-home'>
                    <div className='background-image'>
                        <div className='search-container'>
                            <HomePageSearch history={this.props.history}/>
                        </div>
                    </div>
                    <div className='featured-properties'>
                        <h2>Propiedades Destacadas</h2>
                        <div className="properties">
                        <Link className="property-link" to="/">
                            <div className="card">
                                <div className="property-image-container">
                                    <img src={property1} alt="property"/>
                                    <p className="web-price">$50,000</p>
                                </div>
                                <div className="property-content">
                                    <h3>101 Address St</h3>
                                    <div className="first-row">
                                        <p>House</p>
                                        <div className="beds">
                                            <p>
                                                <HotelIcon fontSize="small" />
                                            </p>
                                            <p>2</p>
                                        </div>
                                        <div className="baths">
                                            <p>
                                                <HotTubIcon fontSize="small" />
                                            </p>
                                            <p>2</p>
                                        </div>
                                        <p>32.3m&#178;</p>
                                    </div>
                                    <div className="second-row">
                                        <div className="location">
                                            <LocationOnIcon fontSize="small" />
                                            <p>Santiago, Chile</p>
                                        </div>
                                        <button className="rent-button">Rent</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link className="property-link" to="/">
                            <div className="card">
                                <div className="property-image-container">
                                    <img src={property1} alt="property"/>
                                    <p className="web-price">$50,000</p>
                                </div>
                                <div className="property-content">
                                    <h3>101 Address St</h3>
                                    <div className="first-row">
                                        <p>House</p>
                                        <div className="beds">
                                            <p>
                                                <HotelIcon fontSize="small" />
                                            </p>
                                            <p>2</p>
                                        </div>
                                        <div className="baths">
                                            <p>
                                                <HotTubIcon fontSize="small" />
                                            </p>
                                            <p>2</p>
                                        </div>
                                        <p>32.3m&#178;</p>
                                    </div>
                                    <div className="second-row">
                                        <div className="location">
                                            <LocationOnIcon fontSize="small" />
                                            <p>Santiago, Chile</p>
                                        </div>
                                        <button className="rent-button">Rent</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link className="property-link" to="/">
                            <div className="card">
                                <div className="property-image-container">
                                    <img src={property1} alt="property"/>
                                    <p className="web-price">$50,000</p>
                                </div>
                                <div className="property-content">
                                    <h3>101 Address St</h3>
                                    <div className="first-row">
                                        <p>House</p>
                                        <div className="beds">
                                            <p>
                                                <HotelIcon fontSize="small" />
                                            </p>
                                            <p>2</p>
                                        </div>
                                        <div className="baths">
                                            <p>
                                                <HotTubIcon fontSize="small" />
                                            </p>
                                            <p>2</p>
                                        </div>
                                        <p>32.3m&#178;</p>
                                    </div>
                                    <div className="second-row">
                                        <div className="location">
                                            <LocationOnIcon fontSize="small" />
                                            <p>Santiago, Chile</p>
                                        </div>
                                        <button className="rent-button">Rent</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                       </div>
                    </div>
                    <div className='services'>
                        <h2>Servicios</h2>
                        <div className='services-cards'>
                            <div className='tile'>
                                <LocationCityIcon
                                    fontSize='large'
                                />
                                <h3>Servicios Corporativos</h3>
                                <p>Asesoramiento integral a empresas. Sabemos que no es tarea sencilla para las compañías encontrar un lugar apropiado para alojar a los ejecutivos que llegan desde el exterior, ayudarles en esta búsqueda es el principal objetivo de ApartmentChile.</p>
                            </div>
                            <div className='tile'>
                                <BusinessIcon
                                    fontSize='large'
                                />
                                <h3>Servicio de Administración</h3>
                                <p>Apartmentchile ofrecerá la gestión en el pago de las cuentas de los diferentes servicios que llegan al departamento como también gastos comunes, arriendos. Mensualmente se hará un informe donde se detallara los gastos adjuntando boletas, para el posterior pago.</p>
                            </div>
                            <div className='tile'>
                                <DriveEtaIcon
                                    fontSize='large'
                                />
                                <h3>Servicio de Mucamas</h3>
                                <p>ApartmenChile podrá contratar un servicio de mucama, donde personal de nuestra empresa realizara el aseo del departamento, diariamente o dias a convenir. Estos servicios son adicionales al arriendo se contratan directamente con Servicios Inmobiliarios Apartmentchile, se cancelan mensualmente.</p>
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
                        <div className="company-image-container">
                            <img className='company-image' src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2784&q=80" alt='company' />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default WebpageHome