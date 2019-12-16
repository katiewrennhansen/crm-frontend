import React, { Component } from 'react'
import './HomePageSearch.css'

class HomePageSearch extends Component {


    handleSubmit = (e) => {
        e.preventDefault();
        console.log('searched')
        const searchData = {
            rent: e.target.rent.value,
            type: e.target.type.value,
            search: e.target.search.value,
            min: e.target.min.value,
            max: e.target.max.value
        }
        console.log(searchData);
        this.props.history.push('/search');
    }

    render(){
        return (
            <div className='home-page-search'>
                <h2 id='hp-search'>Find Your Next Home</h2>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <select className='rent' name='rent' id='rent'>
                        <option value='en arriendo'>En Arriendo</option>
                        <option value='en venta'>En Venta</option>
                    </select>
                    <select className='type' name='type'>
                        <option value=''>Tipo Propiedad</option>
                        <option value='en venta'>Casa</option>
                        <option value='en venta'>Casa Amoblada</option>
                        <option value='en venta'>Departamento</option>
                    </select>
                    <input type='text' id='search' name='search' placeholder='search'/>
                    <input type='number' name='min' id='min' placeholder='mínimo' />
                    <input type='number' name='max' id='max' placeholder='máximo' />
                    <input type='submit' />
                </form>
            </div>
        )
    }
}

export default HomePageSearch