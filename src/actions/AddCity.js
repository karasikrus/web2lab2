import {ADD_CITY, ADD_CITY_SUCCEEDED, ADD_CITY_FAILED} from "./ActionTypes";

export function addCity(payload) {
    return {type: ADD_CITY, payload}
}
export function addCitySucceeded(payload) {
    return {type: ADD_CITY_SUCCEEDED, payload}
}
export function addCityFailed(payload) {
    return {type: ADD_CITY_FAILED, payload}
}
