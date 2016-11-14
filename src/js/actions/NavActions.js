import history from '../services/history';
import { selectCity } from './CitiesActions';

const absUrlReg = new RegExp('^(?:[a-z]+:)?//', 'i');

export const toggleMenu = (e) => {
    const menu = e.currentTarget.getAttribute('data-menu');
    return {
        type: 'NAV_TOGGLE_MENU',
        menu,
    };
};

const _applyPath = (path) => {
    return (dispatch, getState) => {
        let page = 'main';
        const state = getState();
        const pathArray = path.split('/').map(p => p.trim()).filter(p => p);
        if (pathArray.length > 0) {
            const city = state.cities.list.find(c => c.uri_name === pathArray[0]);
            if (city) {
                if (city.id !== state.cities.currentId) {
                    dispatch(selectCity(city.id));
                }
                pathArray.shift();
            }
            if (pathArray.length > 0) {
                page = pathArray[0];
            }
        }
        dispatch({
            type: 'NAV_OPEN_PAGE',
            page,
            path,
        });
    };
};

export const addHistoryListener = () => {
    return (dispatch, getState) => {
        const location = history.location;
        console.debug('addHistoryListener:', location);
        _applyPath(location.pathname)(dispatch, getState);
        history.listen((location, action) => {
            // location is an object like window.location
            console.debug(action, location.pathname, location.state);
            _applyPath(location.pathname)(dispatch, getState);
        });
    };
};

export const openUri = (uri) => {
    return (dispatch, getState) => {
        if (absUrlReg.test(uri)) {
            console.debug('[openUri] external link:', uri);
            window.location.assign(uri);
        }
        const state = getState();
        uri = (uri[0] === '/') ? uri : `${state.nav.path}/${uri}`;
        console.debug('[openUri]', uri);
        history.push(uri);
    };
};