import React from "react"
import '../styles/LocationWeatherInfo.css'
import {connect} from "react-redux";
import {addCity} from "../actions/AddCity";
import {deleteCity} from "../actions/DeleteCity";

const ApiKey = '982553b8d730dcb96e93d24aa490d4fe';
const ApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
//delete city
//error city
//middleware
function mapDispatchToProps(dispatch) {
    console.log('a');
    return {

        deleteCity: city => dispatch(deleteCity(city))
    };
}


class ConnectedLocationWeatherInfo extends React.Component {

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



    componentDidMount() {
        console.log('props = ', this.props);
        //this.getWeather(this.props.city, this.props.longitude, this.props.latitude);
    }

    componentDidUpdate(prevProps) {
        // if (prevProps.city !== this.props.city || prevProps.longitude !== this.props.longitude
        //     || prevProps.latitude !== this.props.latitude) {
        //     this.getWeather(this.props.city, this.props.longitude, this.props.latitude);
        // }
    }


    render() {
        return (
            <div>
                <div>
                </div>
                {this.props.city.isLoading &&
                <div>
                    <p>Грузится...</p>
                </div>
                }
                {this.props.city.name && !this.props.city.isLoading && !this.props.city.error &&
                <div className={'weather'}>
                    <div className={'city'}>{this.props.city.name}</div>
                    <div className={'img'}>
                        <img src={'http://openweathermap.org/img/wn/'+ this.props.city.icon +'@2x.png'} alt={'weather icon'}/>
                    </div>
                    <div className={'infoType'}>
                        <div>temperature</div>
                        <div>{this.props.city.temp}</div>
                    </div>
                    <div className={'infoType'}>
                        <div>humidity</div>
                        <div>{this.props.city.humidity}</div>
                    </div>
                    <div className={'infoType'}>
                        <div>pressure</div>
                        <div>{this.props.city.pressure}</div>
                    </div>
                    <div className={'infoType'}>
                        <div>wind</div>
                        <div>{this.props.city.wind}</div>
                    </div>
                </div>
                }
                {this.props.city.error &&
                <div>
                    <p>{this.props.city.error}</p>
                </div>

                }

            </div>
        )
    }
}
const LocationWeatherInfo = connect(
    null,
    null
)(ConnectedLocationWeatherInfo);
export default LocationWeatherInfo
