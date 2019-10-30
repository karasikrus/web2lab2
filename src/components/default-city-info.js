import React from 'react';

import LocationWeatherInfo from "./location-weather-info";

class DefaultCityInfo extends React.Component{
    state = {
        city: 'санкт-петербург'
    }
    submitHandler = (e) => {
        e.preventDefault();
        console.log('pressed');
        this.setState({
            city: 'москва'
        });
        console.log(this.state.city);
    }



    render() {
        return(
            <div>
                <form onSubmit={this.submitHandler}>
                    <button>show weather in saint-petersburg</button>
                </form>
                <LocationWeatherInfo city={this.state.city}/>
            </div>
        );
    }
}

export default DefaultCityInfo
