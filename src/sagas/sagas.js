import {put, takeEvery, all, call} from 'redux-saga/effects'

import {fetchCity, fetchCityFailed, fetchCitySucceeded, updateWeather} from "../actions/FetchCity";
import {addCity, addCitySucceeded, addCityFailed, addCityStarted} from "../actions/AddCity";

const ApiKey = '982553b8d730dcb96e93d24aa490d4fe';
const ApiUrl = 'https://api.openweathermap.org/data/2.5/weather';


export function* helloSaga() {
    console.log('Hello Sagas!')
}

export function* watchGetWeather() {
    yield takeEvery('GET_WEATHER', getWeather);
}


async function fetchWeather(city, longitude, latitude) {
    if (city === undefined && longitude === undefined && latitude === undefined) {
        return null;
    }
    console.log('fetching weather for city = ', city)
    let url = new URL(ApiUrl);
    url.searchParams.append('appid', ApiKey);
    url.searchParams.append('units', 'metric');
    if (longitude && latitude) {
        url.searchParams.append('lon', longitude);
        url.searchParams.append('lat', latitude);
    } else {
        url.searchParams.append('q', city);
    }
    console.log("fetching url = ", url);
    let response = await fetch(url);
    const data = await response.json();
    console.log('reply data = ', data);
    console.log('data.cod = ', data.cod);
    if (data.cod === 200) {
        console.log('fetch success');
        return Promise.resolve(data);
    } else {
        return Promise.reject(data);
    }
};

export function* watchAddNewCity() {
    yield takeEvery('ADD_CITY', addNewCity);
}

function* addNewCity(data) {
    const cityName = data.payload.name;
    console.log('addNewCity saga is adding new city:', cityName, 'payload = ', data.payload);
    let time = Date.now();
    let newCity = {
        timeAdded: time,
        isLoading: true
    };
    yield put(addCityStarted(newCity));
    try {
        const data = yield call(() => {
            return fetchWeather(cityName)
                .then(data => data)
        });
        newCity = {
            temp: data.main.temp,
            name: data.name,
            timeAdded: time,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            icon: data.weather[0].icon,
            isLoading: false
        };
        console.log('newCity = ', newCity);
        yield put(addCitySucceeded(newCity));

    } catch (error) {
        console.log('error in addNewCity saga');
        yield put(addCityFailed());
    }
}

function* getWeather(action) {
    const city = action.payload.city;
    const longitude = action.payload.longitude;
    const latitude = action.payload.latitude;
    // e.preventDefault();
    let weather = {};
    try {
        if (city.name === undefined && longitude === undefined && latitude === undefined) {
            return null;
        }
        yield put(fetchCity());
        const data = yield call(() => {
            return fetchWeather(city, longitude, latitude)
                .then(res => res.json())
        });
        weather = {
            temp: data.main.temp,
            city: city,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            icon: data.weather[0].icon
        };
        yield put(fetchCitySucceeded(weather));

    } catch (error) {
        weather = {
            error: error.message
        };
        yield put(fetchCityFailed(weather));
    }
}
