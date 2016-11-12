import { combineReducers } from 'redux';
import helmet from './helmet';
import cities from './cities';
import nav from './nav';
import categories from './categories';
import categoriesMenu from './categoriesMenu';
import searchMenu from './searchMenu';
import staticPage from './staticPage';
import catalog from './catalog';
import product from './product';

const rootReducer = combineReducers({
    helmet,
    cities,
    nav,
    categories,
    categoriesMenu,
    searchMenu,
    staticPage,
    catalog,
    product,
});

export default rootReducer;