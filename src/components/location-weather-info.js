import React from "react"


const ApiKey = '4d7bab9a12e7e664eeadf2d29a195b1f';
const ApiUrl = 'https://api.openweathermap.org/data/2.5/weather';

class LocationWeatherInfo extends React.Component{

    state = {
        temp: undefined,
        city: undefined,
        pressure: undefined,
        humidity: undefined,
        wind: undefined,
        error: undefined
    };

    getWeather = async (e) => {
        e.preventDefault();
        let url = new URL(ApiUrl);
        url.searchParams.append('appid', ApiKey);
        url.searchParams.append('units', 'metric');
        url.searchParams.append('q', 'санкт-петербург');
        let response = await fetch(url);
        const data = await response.json();
        console.log(data);
        this.setState({
            temp: data.main.temp,
            city: data.name,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            wind: data.wind.speed
        });
        console.log(this.state);

        // if (response.status === 200) {
        //     return await response.json();
        // } else {
        //     await response.json()
        //         .then(json => Promise.reject(json))
        // }
        return data;
    }

    render() {
        return(
            <div>
                <div>
                    <form onSubmit={this.getWeather}>
                        <button>show weather in saint-petersburg</button>
                    </form>
                </div>
                {this.state.city &&
                    <div>
                        <p>{this.state.city}</p>
                        <p>temperature = {this.state.temp}</p>
                        <p>humidity = {this.state.humidity}</p>
                        <p>pressure = {this.state.pressure}</p>
                        <p>wind = {this.state.wind}</p>
                    </div>
                }

            </div>
        )
    }
}
export default LocationWeatherInfo
