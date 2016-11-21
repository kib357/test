import { API_URI } from '../const';
import history from '../services/history';

const pageParams = {
    'click-collect': (state) => `&city_id__uri_name=${state.cities.current.uri_name}`,
};

export const fetchPage = () => {
    return (dispatch, getState) => {
        const state = getState();
        const page = state.nav.page;
        // const city = getState().cities.current;
        // const uri = `${API_URI}/pages/${page}?city_id=${city.erp_id}`;
        const uri = `${API_URI}/pages/${page}?format=json${(pageParams[page] != null ? pageParams[page](state) : '')}`;
        dispatch({
            type: 'STATIC_PAGE_FETCH',
            $fetch: uri,
        });
    };
};

export const openPage = (page) => {
    return (dispatch, getState) => {
        const state = getState();
        const city = state.cities.current;
        history.push(`/${city.uri_name}/${page}`);
        dispatch({
            type: 'NAV_TOGGLE_MENU',
        });
    };
};