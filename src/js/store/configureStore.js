import { createStore, applyMiddleware } from 'redux';
import createFetchMiddleware from '../middleware/fetch';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(createFetchMiddleware(), thunkMiddleware, createLogger())
    );
}