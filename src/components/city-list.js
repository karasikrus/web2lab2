import React from 'react';
import LocationWeatherInfo from "./location-weather-info";
import DeleteCity from "./delete-city";
import AddCity from "./add-city";
import {connect} from "react-redux";
import {addCity} from "../actions/add-city";
import {deleteCity} from "../actions/delete-city";

function mapDispatchToProps(dispatch) {
    return {
        addCity: city => dispatch(addCity(city)),
        deleteCity: city => dispatch(deleteCity(city))
    };
}

class ConnectedCityList extends React.Component {
    state = {
        cities: []
    }

    addCity = (cityName) => {
        let cities = this.state.cities;
        const timeAdded = Date.now();
        cities.push({
            name: cityName,
            timeAdded: timeAdded
        });
        this.setState({
            cities: cities
        });
        this.props.addCity({
            name: cityName,
            timeAdded: timeAdded
        });
    }

    removeCity = (city) => {
        let cities = this.state.cities;
        const index = cities.indexOf(city);
        cities.splice(index, 1);
        this.setState({
            cities: cities
        });
        this.props.deleteCity(city);
    }

    formatCities = (cities) => {
        return cities.map((city) =>
            <li key={city.timeAdded}>
                <p>{city.name}</p>
                <LocationWeatherInfo city={city.name}/>
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
