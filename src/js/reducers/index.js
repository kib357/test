import { combineReducers } from 'redux';
import helmet from './helmet';
import cities from './cities';
import nav from './nav';
import categories from './categories';
import categoriesMenu from './categoriesMenu';
import searchMenu from './searchMenu';

const rootReducer = combineReducers({
    helmet,
    cities,
    nav,
    categories,
    categoriesMenu,
    searchMenu,
});

export default rootReducer;