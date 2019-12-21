import {
    ADD_CITY,
    DELETE_CITY,
    FETCH_CITY,
    FETCH_CITY_SUCCEEDED,
    FETCH_CITY_FAILED,
    ADD_CITY_STARTED,
    ADD_CITY_SUCCEEDED,
    ADD_CITY_FAILED
} from "../actions/ActionTypes";

const initialState = {
    cityError: false,
    cities: []
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_CITY_FAILED) {
        return Object.assign({}, state, {
            cityError: true
        });
    }
    else if (action.type === ADD_CITY_STARTED) {
        console.log('add_city_started');
        return Object.assign({}, state, {
            cities: state.cities.concat(action.payload)
        });
    }
    else if (action.type === ADD_CITY_SUCCEEDED) {
        console.log('add_city_succ');
        let oldState = Object.assign({}, state);
        console.log(JSON.stringify(oldState));
        const index = oldState.cities.findIndex(x => x.timeAdded === action.payload.timeAdded);
        oldState.cities[index] = action.payload;
        console.log(JSON.stringify(oldState));
        return JSON.parse(JSON.stringify(oldState));
    } else if (action.type === DELETE_CITY) {
        return Object.assign({}, state, {
            cities: state.cities.filter(function (city) {
                return city.timeAdded !== action.payload.timeAdded;
            })
        });
    } else if (action.type === FETCH_CITY){
        let oldState = Object.assign({}, state);
        const index = oldState.cities.findIndex(x => x.timeAdded === action.payload.timeAdded);
        oldState.cities[index].isLoading = true;
        return JSON.parse(JSON.stringify(oldState));
    } else if (action.type === FETCH_CITY_SUCCEEDED){
        let oldState = Object.assign({}, state);
        const index = oldState.cities.findIndex(x => x.timeAdded === action.payload.timeAdded);
        oldState.cities[index] = action.payload;
        return JSON.parse(JSON.stringify(oldState));
    } else if (action.type === FETCH_CITY_FAILED){
        let oldState = Object.assign({}, state);
        const index = oldState.cities.findIndex(x => x.timeAdded === action.payload.timeAdded);
        oldState.cities[index].isLoading = false;
        oldState.cities[index].error = true;
        return JSON.parse(JSON.stringify(oldState));
    }
        return state;
};

export default rootReducer;
