import React from 'react';
import LocationWeatherInfo from "./LocationWeatherInfo";
import DeleteCity from "./DeleteCity";
import AddCity from "./AddCity";
import {connect} from "react-redux";
import {addCity} from "../actions/AddCity";
import {deleteCity} from "../actions/DeleteCity";
import '../styles/CityList.css'

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
                <AddCity addCity={this.addCity}/>
                <ul id="city-grid">{this.formatCities(this.props.cities)}</ul>
            </div>

        );
    }
}

const CityList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedCityList);

export default CityList
