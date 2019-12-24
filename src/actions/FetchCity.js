import {FETCH_CITY, FETCH_CITY_SUCCEEDED, FETCH_CITY_FAILED, GET_WEATHER, UPDATE_GEO, UPDATE_GEO_SUCCEEDED} from "./ActionTypes";

export function fetchCity(payload) {
    return {type: FETCH_CITY, payload}
}
export function fetchCitySucceeded(payload) {
    return {type: FETCH_CITY_SUCCEEDED, payload}
}
export function fetchCityFailed(payload) {
    return {type: FETCH_CITY_FAILED, payload}
}
export function updateWeather(payload) {
    return {type: GET_WEATHER, payload}
}
export function updateGeo(payload) {
    return {type: UPDATE_GEO, payload}
}
export function updateGeoSucceeded(payload) {
    return {type: UPDATE_GEO_SUCCEEDED, payload}
}
