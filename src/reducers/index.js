import {ADD_CITY} from "../actions/action-types";

const initialState = {
    cities: []
};

function rootReducer(state = initialState, action) {
    if(action.type === ADD_CITY){
        return Object.assign({}, state, {
            cities: state.cities.concat(action.payload)
        });
    }
    return state;
};

export default rootReducer;
