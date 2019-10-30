import React from 'react';

import './components/location-weather-info'

import './App.css';
import LocationWeatherInfo from "./components/location-weather-info";

class  App extends React.Component{

  render() {
    return(
      <div>
        <div>
          Работаем
        </div>
          <LocationWeatherInfo/>

      </div>
    )
  }

}
export default App;
