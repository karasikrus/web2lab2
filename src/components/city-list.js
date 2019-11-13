import React from 'react';
import LocationWeatherInfo from "./location-weather-info";
import DeleteCity from "./delete-city";
import AddCity from "./add-city";
import {connect} from "react-redux";
import {addCity} from "../actions/add-city";
import {deleteCity} from "../actions/delete-city";
import '../styles/city-list.css'

function mapDispatchToProps(dispatch) {
    console.log('a');
    return {
        addCity: city => dispatch(addCity(city)),
        deleteCity: city => dispatch(deleteCity(city))
    };
}

function mapStateToProps(state) {
    console.log('b');
    return {cities: state.cities};
};

class ConnectedCityList extends React.Component {


    addCity = (cityName) => {
        const timeAdded = Date.now();
        this.props.addCity({
            name: cityName,
            timeAdded: timeAdded
        });
        console.log(this.props.cities);
    }

    removeCity = (city) => {
        this.props.deleteCity(city);
    }

    formatCities = (cities) => {
        return cities.map((city) =>
            <li key={city.timeAdded}>
                <LocationWeatherInfo city={city.name}/>
                <DeleteCity city={city} removeCity={this.removeCity}/>
            </li>
        );
    };

    render() {
        return (
            <div>
                <ul id="city-grid">{this.formatCities(this.props.cities)}</ul>
                <AddCity addCity={this.addCity}/>
            </div>

        );
    }
}

const CityList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedCityList);

export default CityList
