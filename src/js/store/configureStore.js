import { createStore, applyMiddleware } from 'redux';
import createFetchMiddleware from '../middleware/fetch';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
    let middleware = [createFetchMiddleware(), thunkMiddleware];

    if (process.env.NODE_ENV !== 'production') {
        const logger = require('redux-logger').createLogger();
        middleware = [...middleware, logger];
    }

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(middleware)
    );
}