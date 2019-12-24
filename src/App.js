import React from 'react';

import './components/LocationWeatherInfo'
import './components/DefaultCityInfo'

import './App.css';
import DefaultCityInfo from "./components/DefaultCityInfo";
import CityList from "./components/CityList";
import "antd/dist/antd.css";

class  App extends React.Component{
    // getLocation = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(showPosition);
    //     }
    // }
    //
    // setLocation()


  render() {
    return(
      <div className={'appMain'}>
          <DefaultCityInfo/>
          <CityList/>
      </div>
    )
  }

}
export default App;
