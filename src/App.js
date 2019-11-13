import React from 'react';

import './components/LocationWeatherInfo'
import './components/DefaultCityInfo'

import './App.css';
import DefaultCityInfo from "./components/DefaultCityInfo";
import CItyList from "./components/CItyList";

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
          <DefaultCityInfo/>
          <CItyList/>

      </div>
    )
  }

}
export default App;
