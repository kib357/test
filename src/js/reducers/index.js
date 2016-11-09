import { combineReducers } from 'redux';
import helmet from './helmet';
import cities from './cities';
import nav from './nav';
import categories from './categories';
import categoriesMenu from './categoriesMenu';

const rootReducer = combineReducers({
    helmet,
    cities,
    nav,
    categories,
    categoriesMenu,
});

export default rootReducer;