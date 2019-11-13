import React from 'react';

import LocationWeatherInfo from "./LocationWeatherInfo";
import "../styles/DefaultCityInfo.css"

class DefaultCityInfo extends React.Component{
    state = {
        city: 'санкт-петербург',
        latitude: undefined,
        longitude: undefined
    }
    submitHandler = (e) => {
        e.preventDefault();
        console.log('pressed');
        this.getLocation();
        console.log(this.state);
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                console.log(this.state);
            }));
        }
    }


    componentDidMount() {
        this.getLocation();
    }



    render() {
        return(
            <div>
                <form onSubmit={this.submitHandler}>
                    <button>update geolocation</button>
                </form>
                <LocationWeatherInfo city={this.state.city} latitude={this.state.latitude} longitude={this.state.longitude}/>
            </div>
        );
    }
}

export default DefaultCityInfo
