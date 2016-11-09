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