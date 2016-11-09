import { CATALOG_API_URI } from '../const';

export const fetchSubCategories = (parentId = 0) => {
    return (dispatch) => {
        dispatch({
            type: 'SUBCATEGORIES_FETCH',
            parentId: '_' + parentId,
            $fetch: [`${CATALOG_API_URI}/categories/${parentId}/subcategories`, {
                method: 'GET',
            }],
        });
    };
};