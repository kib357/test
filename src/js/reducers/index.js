import { combineReducers } from 'redux';
import helmet from './helmet';
import cities from './cities';
import nav from './nav';
import categories from './categories';
import categoriesMenu from './categoriesMenu';
import searchMenu from './searchMenu';
import staticPage from './staticPage';

const rootReducer = combineReducers({
    helmet,
    cities,
    nav,
    categories,
    categoriesMenu,
    searchMenu,
    staticPage,
});

export default rootReducer;