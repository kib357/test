import { API_URI } from '../const';
import history from '../services/history';

export const fetchPage = () => {
    return (dispatch, getState) => {
        const page = getState().nav.page;
        const cityId = getState().cities.currentId;
        dispatch({
            type: 'STATIC_PAGE_FETCH',
            $fetch: [`${API_URI}/pages/${page}?city_id=${cityId}`, {
                method: 'GET',
            }],
        });
    };
};

export const openPage = (page) => {
    return (dispatch, getState) => {
        const state = getState();
        const city = state.cities.list.find(city => city.id === state.cities.currentId);
        history.push(`/${city.uri_name}/${page}`);
        dispatch({
            type: 'NAV_TOGGLE_MENU',
        });
    };
};