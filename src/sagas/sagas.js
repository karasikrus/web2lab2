import {put, takeEvery, call} from 'redux-saga/effects'

import {fetchCity, fetchCityFailed, fetchCitySucceeded, updateGeoSucceeded} from "../actions/FetchCity";
import {addCitySucceeded, addCityStarted} from "../actions/AddCity";
import {deleteCity} from "../actions/DeleteCity";
import {notification} from "antd";

const ApiKey = '982553b8d730dcb96e93d24aa490d4fe';
const ApiUrl = 'https://api.openweathermap.org/data/2.5/weather';



export function* watchGetWeather() {
    yield takeEvery('GET_WEATHER', getWeather);
}

export function* watchUpdateGeo() {
    yield takeEvery('UPDATE_GEO', updateGeo);
}

function* updateGeo(payload) {
    let coords = {};
    try {

        coords = yield call(() => {
            return getLocation()
                .then(data => data)
        });
    } catch (error) {
        console.log('error in getLocation');
    }
    try {
        const data = yield call(() => {
            return fetchWeather(payload.payload.name, coords.longitude, coords.latitude)
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
    let url;
    if (longitude && latitude) {
        url = new URL( '/weather/coordinates');
        url.searchParams.append('lon', longitude);
        url.searchParams.append('lat', latitude);
    } else {
        url = new URL( '/weather');
        url.searchParams.append('q', city);
    }
    let response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
        return Promise.resolve(data);
    } else {
        return Promise.reject(data);
    }
}

export function* watchAddNewCity() {
    yield takeEvery('ADD_CITY', addNewCity);
}

function* addNewCity(data) { //change
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
        let url = '/favourites?name=' + newCity.name + '&timeAdded=' + newCity.timeAdded;
        return fetch(url, {
            method: 'post'
        })
            .then(yield put(addCitySucceeded(newCity)));


    } catch (error) {
        yield put(deleteCity(newCity));
        notification.error({
            message: `Cannot add city ${cityName}`,
            description:'There is no such city in database',
            duration: 0
        });
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
export function* watchFetchCities(){
    yield takeEvery('FETCH_CITIES', fetchCities);
}


function* fetchCities(){
    let url = '/favourites';
    const data = yield fetch(url)
        .then(data => data)
    yield data.forEach(
        city => put(addCityStarted(city))
    );
    yield data.forEach(
        city => put(fetchCity(city))
    );
    yield data.forEach(
        city => put(addCitySucceeded(city))
    )
}

export function* watchDeleteCity(){
    yield takeEvery('DELETE_CITY_FROM_SERVER', deleteCityFromServer);
}

function* deleteCityFromServer(data){
    const city = data.payload;
    let url = '/favourites?name=' + city.name + '&timeAdded=' + city.timeAdded;
    return fetch(url, {
        method: 'delete'
    })
        .then(yield put(deleteCity(city)));
}
//add delete city
