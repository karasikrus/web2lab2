import {put, takeEvery, all, call} from 'redux-saga/effects'

import {fetchCity, fetchCityFailed, fetchCitySucceeded, updateWeather, updateGeoSucceeded} from "../actions/FetchCity";
import {addCity, addCitySucceeded, addCityFailed, addCityStarted} from "../actions/AddCity";
import {deleteCity} from "../actions/DeleteCity";

const ApiKey = '982553b8d730dcb96e93d24aa490d4fe';
const ApiUrl = 'https://api.openweathermap.org/data/2.5/weather';



export function* watchGetWeather() {
    yield takeEvery('GET_WEATHER', getWeather);
}

export function* watchUpdateGeo() {
    yield takeEvery('UPDATE_GEO', updateGeo);
}

function* updateGeo(payload) {
    const coords = yield call(() => {
        return getLocation()
            .then(data => data)
    });
    try {
        const data = yield call(() => {
            return fetchWeather(payload.name, coords.longitude, coords.latitude)
                .then(data => data)
        });
        const defaultCity = {
            temp: data.main.temp,
            name: data.name,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            icon: data.weather[0].icon,
            isLoading: false,
            longitude: coords.longitude,
            latitude: coords.latitude
        };
        yield put(updateGeoSucceeded(defaultCity));

    } catch (error) {
        console.log('error in updateGeo');
    }

}


async function fetchWeather(city, longitude, latitude) {
    if (city === undefined && longitude === undefined && latitude === undefined) {
        return null;
    }
    let url = new URL(ApiUrl);
    url.searchParams.append('appid', ApiKey);
    url.searchParams.append('units', 'metric');
    if (longitude && latitude) {
        url.searchParams.append('lon', longitude);
        url.searchParams.append('lat', latitude);
    } else {
        url.searchParams.append('q', city);
    }
    let response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
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
        yield put(deleteCity(newCity));
        alert('cannot add such city');
    }
}

function* getWeather(action) {
    const city = action.payload.city;
    const longitude = action.payload.longitude;
    const latitude = action.payload.latitude;
    const time = city.timeAdded;
    let updatedCity = {};
    if (city.name) {
        yield put(fetchCity(city));
    }
    try {
        if (city.name === undefined && longitude === undefined && latitude === undefined) {
            return null;
        }
        const data = yield call(() => {
            return fetchWeather(city.name, longitude, latitude)
                .then(data => data)
        });
        updatedCity = {
            temp: data.main.temp,
            name: data.name,
            timeAdded: time,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            icon: data.weather[0].icon,
            isLoading: false
        };
        yield put(fetchCitySucceeded(updatedCity));

    } catch (error) {
        yield put(fetchCityFailed(city));
    }
}

async function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }),
            error => reject(error),
        );
    });
}
