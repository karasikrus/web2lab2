import React from "react"
import '../styles/LocationWeatherInfo.css'

const ApiKey = '982553b8d730dcb96e93d24aa490d4fe';
const ApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
//delete city
//error city
//middleware


class LocationWeatherInfo extends React.Component {

    state = {
        temp: undefined,
        city: undefined,
        pressure: undefined,
        humidity: undefined,
        wind: undefined,
        icon: undefined,
        error: undefined,
        isLoading: false
    };


    getWeather = async (city, longitude, latitude) => {
        // e.preventDefault();
        if (city === undefined && longitude === undefined && latitude === undefined) {
            return null;
        }
        this.setState({
            isLoading: true
        });
        console.log('long = ', longitude);
        let url = new URL(ApiUrl);
        url.searchParams.append('appid', ApiKey);
        url.searchParams.append('units', 'metric');
        if (longitude && latitude) {
            console.log('coordinates');
            url.searchParams.append('lon', longitude);
            url.searchParams.append('lat', latitude);
        } else {
            url.searchParams.append('q', city);
        }
        let response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            this.setState({
                isLoading: false,
                temp: data.main.temp,
                city: data.name,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                wind: data.wind.speed,
                icon: data.weather[0].icon
            });
        } else {
            this.setState({
                isLoading: false,
                error: data.message
            });
        }
        return data;
    }

    componentDidMount() {
        this.getWeather(this.props.city, this.props.longitude, this.props.latitude);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.city !== this.props.city || prevProps.longitude !== this.props.longitude
            || prevProps.latitude !== this.props.latitude) {
            this.getWeather(this.props.city, this.props.longitude, this.props.latitude);
        }
    }


    render() {
        return (
            <div>
                <div>
                </div>
                {this.state.isLoading &&
                <div>
                    <p>Грузится...</p>
                </div>
                }
                {this.state.city && !this.state.isLoading && !this.state.error &&
                <div className={'weather'}>
                    <div className={'city'}>{this.state.city}</div>
                    <div className={'img'}>
                        <img src={'http://openweathermap.org/img/wn/'+ this.state.icon +'@2x.png'} alt={'weather icon'}/>
                    </div>
                    <div className={'infoType'}>
                        <div>temperature</div>
                        <div>{this.state.temp}</div>
                    </div>
                    <div className={'infoType'}>
                        <div>humidity</div>
                        <div>{this.state.humidity}</div>
                    </div>
                    <div className={'infoType'}>
                        <div>pressure</div>
                        <div>{this.state.pressure}</div>
                    </div>
                    <div className={'infoType'}>
                        <div>wind</div>
                        <div>{this.state.wind}</div>
                    </div>
                </div>
                }
                {this.state.error &&
                <div>
                    <p>{this.state.error}</p>
                </div>

                }

            </div>
        )
    }
}

export default LocationWeatherInfo
