import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';

import rootReducer from "./reducers/Root";
import {watchGetWeather, watchAddNewCity, watchUpdateGeo, watchDeleteCity, watchFetchCities} from "./sagas/sagas";

const sagaMiddleware = createSagaMiddleware();

const persistedState = {
        defaultCity: {
            name: 'санкт-петербург',
            latitude: undefined,
            longitude: undefined
        },
        cities: []
    };
const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(watchGetWeather);
sagaMiddleware.run(watchAddNewCity);
sagaMiddleware.run(watchUpdateGeo);
sagaMiddleware.run(watchDeleteCity);
sagaMiddleware.run(watchFetchCities);

export default store;
