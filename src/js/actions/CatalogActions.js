import { CATALOG_API_URI, FILTERS_LS_KEY } from '../const';
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
            Object.assign({}, searchCategory, {
                generic_id: getURLParameter('generic_id'),
                generic_name: (getURLParameter('gpname') || '').slice(0, 100),
                phrase: (getURLParameter('phrase') || '').slice(0, 100),
            })
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

        const pageParams = `&from=${pageSize * page}&size=${pageSize}`;
        const gpId = state.catalog.genericProductId || '';
        const gpIdParam = gpId && ('&generic_id=' + gpId);
        const filters = state.catalog.filters;
        const filtersParam = filters.length > 0 ? `&options_ids[]=${filters.join('|')}` : '';
        const phraseParam = category.phrase ? `&phrase=${encodeURIComponent(category.phrase)}` : '';
        const sortType = state.catalog.sortType;
        let sortTypeParam = '';
        if (sortType !== 'default') {
            let t = sortType, d = 'asc';
            if (sortType.indexOf('Desc') > 0) {
                d = 'desc';
                t = t.replace('Desc', '');
            }
            sortTypeParam = `&sort_type=${t}&sort_direction=${d}`;
        }

        console.debug('[fetchItems] category:', category);
        const uri = (category.id === '-1' || gpId) ?
            `${CATALOG_API_URI}/generic_products/${category.generic_id}/products/?city_id=${cityId}${phraseParam}${pageParams}${gpIdParam}${filtersParam}${sortTypeParam}`
            :
            `${CATALOG_API_URI}/categories/${category.id}/products/?city_id=${cityId}${pageParams}${filtersParam}${sortTypeParam}`;
        dispatch({
            type: 'CATALOG_ITEMS_FETCH',
            $fetch: uri,
            page,
        });
    };
};
// options_ids[]=27519|27526
// http://catalog-api.sdvor.com/categories/47/products/?city_id=1000&sort_type=price1&sort_direction=asc
// http://catalog-api.sdvor.com/generic_products/159/products/?category_id=216&city_id=1000&generic_id=159
// http://catalog-api.sdvor.com/generic_products/262/products/?city_id=7000&generic_id=262&phrase=%D0%BA%D0%B8%D1%80%D0%BF

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

export const selectGenericProduct = (id) => {
    return (dispatch, getState) => {
        const {catalog} = getState();
        localStorage.setItem(`${FILTERS_LS_KEY}-${catalog.category.id}`, JSON.stringify({ gpId: id, date: Date.now() }));
        dispatch({
            type: 'CATALOG_SELECT_GENERIC_PRODUCT',
            id,
        });
    };
};

export const selectSortType = (data) => ({
    type: 'CATALOG_SELECT_SORT_TYPE',
    data,
});

export const toggleFilters = () => ({
    type: 'CATALOG_TOGGLE_FILTERS',
});

export const changeFilters = (filters) => ({
    type: 'CATALOG_CHANGE_FILTERS',
    filters,
});

export const applyFilters = () => ({
    type: 'CATALOG_APPLY_FILTERS',
});