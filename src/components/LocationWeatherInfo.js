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
    return {

        deleteCity: city => dispatch(deleteCity(city))
    };
}


class ConnectedLocationWeatherInfo extends React.Component {




    render() {
        return (
            <div key={this.props.city.isLoading}>
                <div>
                </div>
                {this.props.city.isLoading &&
                <div>
                    <p>Грузится...</p>
                </div>
                }
                {this.props.city.name && !this.props.city.isLoading && !this.props.city.error &&
                <div className={'weather'}>
                    {!this.props.city.longitude &&
                    <div className={'city'}>{this.props.city.name}</div>
                    }
                    {this.props.city.longitude &&
                    <div className={'defaultCity'}>{this.props.city.name}</div>
                    }
                    <div className={'img'}>
                        <img src={'http://openweathermap.org/img/wn/' + this.props.city.icon + '@2x.png'}
                             alt={'weather icon'}/>
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
                    {this.props.city.longitude &&
                    <div className={'infoType'}>
                        <div>longitude</div>
                        <div>{this.props.city.longitude.toFixed(2)}</div>
                    </div>
                    }
                    {this.props.city.latitude &&
                    <div className={'infoType'}>
                        <div>latitude</div>
                        <div>{this.props.city.latitude.toFixed(2)}</div>
                        </div>
                    }
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
