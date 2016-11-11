import { CATALOG_API_URI } from '../const';
import history from '../services/history';

export const fetchSubCategories = (parentId = 0) => ({
    type: 'SUBCATEGORIES_FETCH',
    parentId: '_' + parentId,
    $fetch: [`${CATALOG_API_URI}/categories/${parentId}/subcategories`, {
        method: 'GET',
    }],
});

export const selectMenuCategory = (id) => {
    return (dispatch, getState) => {
        const categories = getState().categories;
        const category = categories.byId['_' + id];
        dispatch({ type: 'CATEGORIES_MENU_SELECT', category });
    };
};

export const openCategory = (id) => {
    return (dispatch, getState) => {
        const state = getState();
        const city = state.cities.current;
        const categories = state.categories.byId;
        let c = categories['_' + id];
        let path = '';
        while (c != null && c.parent_id) {
            path = `${c.uri_name}/${path}`;
            c = categories['_' + c.parent_id];
        }
        history.push(`/${city.uri_name}/catalog/${path}`);
        dispatch({
            type: 'NAV_TOGGLE_MENU',
        });
    };
};