import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';

import rootReducer from "./reducers/Root";
import { helloSaga, watchGetWeather, watchAddNewCity } from "./sagas/sagas";

const sagaMiddleware = createSagaMiddleware();

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState'))
    : {
        cities: []
    };
const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(sagaMiddleware)
);
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});
sagaMiddleware.run(helloSaga);
sagaMiddleware.run(watchGetWeather);
sagaMiddleware.run(watchAddNewCity);

export default store;
