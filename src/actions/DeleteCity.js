import {DELETE_CITY, DELETE_CITY_FROM_SERVER} from "./ActionTypes";

export function deleteCity(payload) {
    return {type: DELETE_CITY, payload}
}
export function deleteCityFromServer(payload) {
    return {type: DELETE_CITY_FROM_SERVER, payload}
}
