import React from 'react';
import LocationWeatherInfo from "./location-weather-info";
import DeleteCity from "./delete-city";
import AddCity from "./add-city";

class CityList extends React.Component{
    state = {
        cities: ['moscow', 'kursk', 'london']
    }

    addCity = (city) => {
        let cities = this.state.cities;
        cities.push(city);
        this.setState({
            cities: cities
        });
    }

    removeCity = (city) => {
        let cities = this.state.cities;
        const index = cities.indexOf(city);
        cities.splice(index,1);
        this.setState({
            cities: cities
        });
    }

    formatCities = (cities) =>{
        return cities.map((city) =>
            <li>
                <p>{city}</p>
                <LocationWeatherInfo city={city}/>
                <DeleteCity city={city} removeCity={this.removeCity}/>
            </li>
        );
    };

    render() {
        return(
            <div>

                <p>Cities: </p>
                <ul>{this.formatCities(this.state.cities)}</ul>
                <AddCity addCity={this.addCity}/>
            </div>

        );
    }
}

export default CityList
