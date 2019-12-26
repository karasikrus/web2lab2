import {put, takeEvery, all, call} from 'redux-saga/effects'

import {fetchCity, fetchCityFailed, fetchCitySucceeded, updateGeoSucceeded} from "../actions/FetchCity";
import {addCitySucceeded, addCityStarted, addCity} from "../actions/AddCity";
import {deleteCity} from "../actions/DeleteCity";
import {notification} from "antd";


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
        url = '/weather/coordinates?lon=' + longitude + '&lat=' + latitude;
    } else {
        url = '/weather?name=' + city;
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
    console.log('addNewCity payload = ', JSON.stringify(data.payload));
    const cityName = data.payload.name;
    const isAdded = data.payload.isAdded;
    let time;
    if (data.payload.timeAdded) {
        console.log('same time');
        time = data.payload.timeAdded;
    } else {
        console.log('new time');
        time = Date.now();
    }
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
        if (!isAdded) {
            let url = '/favourites?name=' + newCity.name + '&timeAdded=' + newCity.timeAdded;
            return fetch(url, {
                method: 'post'
            })
                .then(yield put(addCitySucceeded(newCity)));
        } else {
            yield put(addCitySucceeded(newCity));
        }

    } catch (error) {
        yield put(deleteCity(newCity));
        notification.error({
            message: `Cannot add city ${cityName}`,
            description: 'There is no such city in database',
            duration: 0
        });
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

export function* watchFetchCities() {
    yield takeEvery('FETCH_CITIES', fetchCities);
}


function* fetchCities() {
    let url = '/favourites';
    console.log('fetching favourites...');
    const data = yield call(fetch, url);
    const cities = yield call([data, data.json]);
    console.log('loaded favourites are: ', JSON.stringify(cities));
    cities.flatMap(city => city.isAdded = true);
    yield all(cities.flatMap(
        city => [
            console.log('city in a flatMap = ', city),
            put(addCity(city)),
        ]
    ));
}

export function* watchDeleteCity() {
    yield takeEvery('DELETE_CITY_FROM_SERVER', deleteCityFromServer);
}

function* deleteCityFromServer(data) {
    const city = data.payload;
    let url = '/favourites?name=' + city.name + '&timeAdded=' + city.timeAdded;
    return fetch(url, {
        method: 'delete'
    })
        .then(yield put(deleteCity(city)));
}
