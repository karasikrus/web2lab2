import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';

import rootReducer from "./reducers/Root";
import { helloSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware.default();

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

export default store;
