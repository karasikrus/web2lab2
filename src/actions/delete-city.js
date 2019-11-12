import {DELETE_CITY} from "./action-types";

export function deleteCity(payload) {
    return {type: DELETE_CITY, payload}
}
