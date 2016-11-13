import { CATALOG_API_URI } from '../const';

export const fetchSearchResults = (query) => {
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