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
        <div>
          <LocationWeatherInfo/>
        </div>

      </div>
    )
  }

}
export default App;
