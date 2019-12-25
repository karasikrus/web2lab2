import {
    DELETE_CITY,
    FETCH_CITY,
    FETCH_CITY_SUCCEEDED,
    FETCH_CITY_FAILED,
    ADD_CITY_STARTED,
    ADD_CITY_SUCCEEDED,
    ADD_CITY_FAILED,
    UPDATE_GEO_SUCCEEDED
} from "../actions/ActionTypes";

const initialState = {
    defaultCity: {
        name: 'санкт-петербург',
        latitude: undefined,
        longitude: undefined
    },
    cityError: false,
    some: 'thing',
    cities: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CITY_FAILED: {
            return Object.assign({}, state, {
                cityError: true
            });
        }
        case ADD_CITY_STARTED: {
            return Object.assign({}, state, {
                cities: state.cities.concat(action.payload)
            });
        }
        case ADD_CITY_SUCCEEDED: {
            let oldState = Object.assign({}, state);
            console.log(JSON.stringify(oldState));
            const index = oldState.cities.findIndex(x => x.timeAdded === action.payload.timeAdded);
            oldState.cities[index] = action.payload;
            console.log(JSON.stringify(oldState));
            return JSON.parse(JSON.stringify(oldState));
        }
        case DELETE_CITY: {
            return Object.assign({}, state, {
                cities: state.cities.filter(function (city) {
                    return city.timeAdded !== action.payload.timeAdded;
                })
            });
        }
        case FETCH_CITY: {
            let oldState = Object.assign({}, state);
            const index = oldState.cities.findIndex(x => x.timeAdded === action.payload.timeAdded);
            oldState.cities[index].isLoading = true;
            return JSON.parse(JSON.stringify(oldState));
        }
        case FETCH_CITY_SUCCEEDED: {
            let oldState = Object.assign({}, state);
            const index = oldState.cities.findIndex(x => x.timeAdded === action.payload.timeAdded);
            oldState.cities[index] = action.payload;
            return JSON.parse(JSON.stringify(oldState));
        }
        case FETCH_CITY_FAILED: {
            let oldState = Object.assign({}, state);
            const index = oldState.cities.findIndex(x => x.timeAdded === action.payload.timeAdded);
            oldState.cities[index].isLoading = false;
            oldState.cities[index].error = true;
            return JSON.parse(JSON.stringify(oldState));
        }
        case UPDATE_GEO_SUCCEEDED: {
            let oldState = Object.assign({}, state);
            oldState.defaultCity = action.payload;
            return JSON.parse(JSON.stringify(oldState));
        }
        default:
            return state;
    }
}

export default rootReducer;
