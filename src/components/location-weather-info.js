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
        error: undefined,
        isLoading: false
    };
    
    testFun = (city) => {
        console.log(city);
        this.setState({
            isLoading: true
        });
    }

    getWeather = async (city) => {
       // e.preventDefault();
        if(city===undefined){
            return null;
        }
        this.setState({
            isLoading: true
        });
        let url = new URL(ApiUrl);
        url.searchParams.append('appid', ApiKey);
        url.searchParams.append('units', 'metric');
        url.searchParams.append('q', city);
        let response = await fetch(url);
        const data = await response.json();
        console.log(data);
        this.setState({
            isLoading: false,
            temp: data.main.temp,
            city: data.name,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            wind: data.wind.speed
        });
        return data;
    }

    componentDidMount() {
        this.getWeather(this.props.city);
    }


    render() {
        return(
            <div>
                <div>
                </div>
                {this.state.isLoading &&
                    <div>
                        <p>Грузится...</p>
                    </div>
                }
                {this.state.city && !this.state.isLoading &&
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
