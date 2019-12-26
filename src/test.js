import renderer from "react-test-renderer";
import React from "react";
import {configure, shallow} from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";

import DeleteCity from './components/DeleteCity'
import AddCity from "./components/AddCity";
import DefaultCityInfo from "./components/DefaultCityInfo";
import CityList from "./components/CityList";
import LocationWeatherInfo from "./components/LocationWeatherInfo";

configure({adapter: new Adapter()});

test("should render DeleteCity", () => {
    const tree = shallow(<DeleteCity/>);
    expect(toJson(tree)).toMatchSnapshot();
});
test("should render AddCity", () => {
    const tree = shallow(<AddCity/>);
    expect(toJson(tree)).toMatchSnapshot();
});
test("should render DefaultCityInfo without geo", () => {
    const mockStore = configureMockStore();
    const store = mockStore({
        defaultCity: {
            name: 'санкт-петербург',
            latitude: undefined,
            longitude: undefined
        }
    });

    const tree = shallow(<DefaultCityInfo store={store}/>).dive();
    tree.render();
    expect(toJson(tree)).toMatchSnapshot();
});
test("should render DefaultCityInfo with geo", () => {
    const mockStore = configureMockStore();
    const store = mockStore({
        defaultCity: {
            name: 'санкт-петербург',
            latitude: 55,
            longitude: 55
        }
    });

    const tree = shallow(<DefaultCityInfo store={store}/>).dive();
    tree.render();
    expect(toJson(tree)).toMatchSnapshot();
});
test("should render CityList with 2 cities", () => {
    const mockStore = configureMockStore();
    const store = mockStore({
        "cities": [{
            "temp": -1.1,
            "name": "Moscow",
            "timeAdded": 1577384881715,
            "pressure": 1009,
            "humidity": 100,
            "wind": 2,
            "icon": "50n",
            "isLoading": false
        }, {
            "temp": 25.66,
            "name": "Kek",
            "timeAdded": 1577384888217,
            "pressure": 1007,
            "humidity": 29,
            "wind": 0.3,
            "icon": "03n",
            "isLoading": false
        }]
    });

    const tree = shallow(<CityList store={store}/>).dive();
    tree.render();
    expect(toJson(tree)).toMatchSnapshot();
});
test("should render CityList with no cities", () => {
    const mockStore = configureMockStore();
    const store = mockStore({
        "cities": []
    });

    const tree = shallow(<CityList store={store}/>).dive();
    tree.render();
    expect(toJson(tree)).toMatchSnapshot();
});
test("should render LocationWeatherInfo with loading", () => {
    const tree = shallow(<LocationWeatherInfo city={{
        "timeAdded": 1577384888217,
        "isLoading": true
    }}/>);
    expect(toJson(tree)).toMatchSnapshot();
});
test("should render LocationWeatherInfo with weather", () => {
    const tree = shallow(<LocationWeatherInfo city={{
        "temp": -1.1,
        "name": "Moscow",
        "timeAdded": 1577384881715,
        "pressure": 1009,
        "humidity": 100,
        "wind": 2,
        "icon": "50n",
        "isLoading": false
    }}/>);
    expect(toJson(tree)).toMatchSnapshot();
});

