import { CATALOG_API_URI } from '../const';

export const fetchSubCategories = (parentId = 0) => ({
    type: 'SUBCATEGORIES_FETCH',
    parentId: '_' + parentId,
    $fetch: [`${CATALOG_API_URI}/categories/${parentId}/subcategories`, {
        method: 'GET',
    }],
});

export const selectMenuCategory = (id) => {
    return (dispatch, getState) => {
        console.log('!!!', id);
        const categories = getState().categories;
        const category = categories.byId['_' + id];
        dispatch({ type: 'CATEGORIES_MENU_SELECT', category });
    };
};

export const openCategory = (id) => {
    return (dispatch, getState) => {
        const state = getState();
        const city = state.cities.list.find(city => city.id === state.cities.currentId);
        const categories = state.categories.byId;
        let c = categories['_' + id];
        let path = '';
        while (c != null && c.parent_id) {
            path = `${c.uri_name}/${path}`;
            c = categories['_' + c.parent_id];
        }
        history.pushState({}, '', '/' + city.uri_name + '/' + path);
    };
};