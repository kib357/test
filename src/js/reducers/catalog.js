const catalogInitialState = {
    category: null,
    fetchingCategory: false,
    items: null,
    fetchingItems: false,
    error: null,
};
export default function categoriesMenu(state = catalogInitialState, action) {
    switch (action.type) {
        case 'CATALOG_CATEGORY_FETCH_REQUEST':
            return Object.assign({}, catalogInitialState, { fetchingCategory: true });
        case 'CATALOG_CATEGORY_FETCH_ERROR':
            return Object.assign({}, catalogInitialState, { error: action.error });
        case 'CATALOG_CATEGORY_FETCH_RESPONSE':
            return Object.assign({}, catalogInitialState, { category: action.data.category });
        case 'CATALOG_ITEMS_FETCH_REQUEST':
            return Object.assign({}, catalogInitialState, { category: state.category, fetchingItems: true });
        case 'CATALOG_ITEMS_FETCH_ERROR':
            return Object.assign({}, catalogInitialState, { error: action.error });
        case 'CATALOG_ITEMS_FETCH_RESPONSE':
            return Object.assign({}, catalogInitialState, { category: state.category, items: action.data });
        case 'NAV_OPEN_PAGE':
            return Object.assign({}, catalogInitialState);
        default:
            return state;
    }
}