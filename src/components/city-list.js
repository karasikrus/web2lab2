import React from 'react';

class CityList extends React.Component{
    state = {
        cities: ['moscow', 'kursk', 'london']
    }

    formatCities = (cities) =>{
        return cities.map((city) =>
                <li>{city}</li>);
    };

    render() {
        return(
            <div>
                <p>Cities: </p>
                <ul>{this.formatCities(this.state.cities)}</ul>
            </div>

        );
    }
}

export default CityList
