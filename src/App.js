import React from 'react';

import './components/location-weather-info'
import './components/default-city-info'

import './App.css';
import DefaultCityInfo from "./components/default-city-info";
import CityList from "./components/city-list";

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
      <div>
        <div>
          Работаем
        </div>
          <DefaultCityInfo/>
          <CityList/>

      </div>
    )
  }

}
export default App;
