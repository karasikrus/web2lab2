import React from 'react';

import './components/location-weather-info'
import './components/default-city-info'

import './App.css';
import DefaultCityInfo from "./components/default-city-info";
import CityList from "./components/city-list";

class  App extends React.Component{


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
