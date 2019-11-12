import React from 'react';
import LocationWeatherInfo from "./location-weather-info";
import DeleteCity from "./delete-city";
import AddCity from "./add-city";
import {connect} from "react-redux";
import {addCity} from "../actions/add-city";

function mapDispatchToProps(dispatch) {
    return {
        addCity: city => dispatch(addCity(city))
    };
}

class ConnectedCityList extends React.Component {
    state = {
        cities: ['moscow', 'kursk', 'london']
    }

    addCity = (city) => {
        let cities = this.state.cities;
        cities.push(city);
        this.setState({
            cities: cities
        });
        this.props.addCity(city);
    }

    removeCity = (city) => {
        let cities = this.state.cities;
        const index = cities.indexOf(city);
        cities.splice(index, 1);
        this.setState({
            cities: cities
        });
    }

    formatCities = (cities) => {
        return cities.map((city) =>
            <li>
                <p>{city}</p>
                <LocationWeatherInfo city={city}/>
                <DeleteCity city={city} removeCity={this.removeCity}/>
            </li>
        );
    };

    render() {
        return (
            <div>

                <p>Cities: </p>
                <ul>{this.formatCities(this.state.cities)}</ul>
                <AddCity addCity={this.addCity}/>
            </div>

        );
    }
}

const CityList = connect(
    null,
    mapDispatchToProps
)(ConnectedCityList);

export default CityList
