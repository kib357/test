import { CATALOG_API_URI } from '../const';
import history from '../services/history';

export const fetchCategory = () => {
    return (dispatch, getState) => {
        const state = getState();
        let uriName = state.nav.path.split('/').filter(p => p).pop();
        uriName = (uriName === 'catalog') ? '/' : uriName;
        const cityId = state.cities.current.erp_id;
        console.debug('[fetchCategory] uriName:', uriName);
        const category = Object.keys(state.categories.byId)
            .map(cName => state.categories.byId[cName])
            .find(c => c.uri_name === uriName);
        console.debug('[fetchCategory] category:', category);
        if (category) {
            return dispatch({
                type: 'CATALOG_CATEGORY_FETCH_RESPONSE',
                data: { category },
            });
        }
        dispatch({
            type: 'CATALOG_CATEGORY_FETCH',
            $fetch: [`${CATALOG_API_URI}/categories/with_uri/?category_uri=${uriName}&city_id=${cityId}`, {
                method: 'GET',
            }],
        });
    };
};

export const fetchItems = (page = 0) => {
    return (dispatch, getState) => {
        const state = getState();
        const category = state.catalog.category;
        const cityId = state.cities.current.erp_id;
        const pageSize = state.catalog.pageSize;
        console.debug('[fetchItems] category:', category);
        dispatch({
            type: 'CATALOG_ITEMS_FETCH',
            $fetch: `${CATALOG_API_URI}/categories/${category.id}/products/?city_id=${cityId}&from=${pageSize * page}&size=${pageSize}`,
            page,
        });
    };
};

export const fetchNextPage = () => {
    return (dispatch, getState) => {
        const page = getState().catalog.page;
        fetchItems(page + 1)(dispatch, getState);
    };
};

export const openCategory = (path) => {
    return (dispatch, getState) => {
        const state = getState();
        const city = state.cities.current;
        history.push(`/${city.uri_name}/catalog${path}`);
    };
};

export const openProduct = (path) => {
    return (dispatch, getState) => {
        const state = getState();
        const city = state.cities.current;
        history.push(`/${city.uri_name}/product/${path}`);
    };
};