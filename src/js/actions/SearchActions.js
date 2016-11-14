import { CATALOG_API_URI } from '../const';
import history from '../services/history';

export const fetchMenuSearchResults = (query) => {
    return (dispatch, getState) => {
        if (!query) {
            return dispatch({ type: 'SEARCH_CLEAR' });
        }
        const state = getState();
        const cityId = state.cities.current.erp_id;
        dispatch({
            type: 'SEARCH_RESULTS_FETCH',
            $fetch: `${CATALOG_API_URI}/products/drop_mobile/?city_id=${cityId}&phrase=${encodeURIComponent(query)}`,
            query,
        });
    };
};

export const openSearchPage = (gpId, gpName, query) => {
    return (dispatch, getState) => {
        const state = getState();
        const city = state.cities.current;
        history.push(`/${city.uri_name}/catalog/search/?generic_id=${gpId}&phrase=${encodeURIComponent(query)}&gpname=${encodeURIComponent(gpName)}`);
        dispatch({
            type: 'NAV_TOGGLE_MENU',
        });
    };
};

export const setSearchQuery = (query) => ({
    type: 'SEARCH_QUERY_CHANGE',
    query,
});

export const clearSearchQuery = () => ({
    type: 'SEARCH_CLEAR',
});