import React from 'react';

import LocationWeatherInfo from "./LocationWeatherInfo";
import "../styles/DefaultCityInfo.css"
import {connect} from "react-redux";
import {updateGeo} from "../actions/FetchCity";

class ConnectedDefaultCityInfo extends React.Component {
    submitHandler = (e) => {
        e.preventDefault();
        console.log('pressed');
        this.props.getLocation(this.props.defaultCity);
        console.log(this.props);
    };




    componentDidMount() {
        this.props.getLocation(this.props.defaultCity);
    }


    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <button>update geolocation</button>
                </form>
                <LocationWeatherInfo city={this.props.defaultCity} latitude={this.props.defaultCity.latitude}
                                     longitude={this.props.defaultCity.longitude}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {defaultCity: state.defaultCity};
}

function mapDispatchToProps(dispatch) {
    return {
        getLocation: payload => dispatch(updateGeo(payload)),
    };
}

const DefaultCityInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedDefaultCityInfo);

export default DefaultCityInfo


