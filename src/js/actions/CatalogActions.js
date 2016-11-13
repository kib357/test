import { CATALOG_API_URI } from '../const';
import history from '../services/history';
import { getURLParameter } from '../services/utils';

const searchCategory = {
    name: 'Поиск',
    uri_name: 'search',
    id: '-1',
};

export const fetchCategory = () => {
    return (dispatch, getState) => {
        const state = getState();
        let uriName = state.nav.path.split('/').filter(p => p).pop();
        uriName = (uriName === 'catalog') ? '/' : uriName;
        const cityId = state.cities.current.erp_id;
        console.debug('[fetchCategory] uriName:', uriName);
        const category = uriName === 'search' ?
            Object.assign({}, searchCategory, { generic_id: getURLParameter('generic_id'), phrase: getURLParameter('phrase') })
            :
            Object.keys(state.categories.byId)
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
        const cityId = state.cities.current.erp_id;
        const pageSize = state.catalog.pageSize;
        const category = state.catalog.category;
        console.debug('[fetchItems] category:', category);
        const uri = category.id === '-1' ?
            `${CATALOG_API_URI}/generic_products/${category.generic_id}/products/?city_id=${cityId}&phrase=${category.phrase}&from=${pageSize * page}&size=${pageSize}`
            :
            `${CATALOG_API_URI}/categories/${category.id}/products/?city_id=${cityId}&from=${pageSize * page}&size=${pageSize}`;
        dispatch({
            type: 'CATALOG_ITEMS_FETCH',
            $fetch: uri,
            page,
        });
    };
};
//http://catalog-api.sdvor.com/generic_products/262/products/?city_id=7000&generic_id=262&phrase=%D0%BA%D0%B8%D1%80%D0%BF

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