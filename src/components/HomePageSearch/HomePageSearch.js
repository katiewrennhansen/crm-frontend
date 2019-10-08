import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './HomePageSearch.css'

class HomePageSearch extends Component {
    render(){
        return (
            <div className='home-page-search'>
                <h2>Find Your Next Home</h2>
                <form>
                    <select className='rent'>
                        <option value='en arriendo'>En Arriendo</option>
                        <option value='en venta'>En Venta</option>
                    </select>
                    <select className='type'>
                        <option value=''>Tipo Propiedad</option>
                        <option value='en venta'>Casa</option>
                        <option value='en venta'>Casa Amoblada</option>
                        <option value='en venta'>Departamento</option>
                    </select>
                    <input type='text' id='search' name='search' placeholder='search'/>
                    <input type='number' name='min' id='min' placeholder='mínimo' />
                    <input type='number' name='max' id='max' placeholder='máximo' />
                    <Link to='/search'>
                    <input type='submit' />
                    </Link>
                </form>
            </div>
        )
    }
}

export default HomePageSearch