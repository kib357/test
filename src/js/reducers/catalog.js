const catalogInitialState = {
    category: null,
    fetchingCategory: false,
    items: null,
    fetchingItems: false,
    skip: 0,
    take: 20,
    error: null,
    page: 0,
    pageSize: 10,
    genericProductId: '',
    showFilters: false,
};
export default function categoriesMenu(state = catalogInitialState, action) {
    switch (action.type) {
        //Category
        case 'CATALOG_CATEGORY_FETCH_REQUEST':
            return Object.assign({}, catalogInitialState, { fetchingCategory: true });
        case 'CATALOG_CATEGORY_FETCH_ERROR':
            return Object.assign({}, catalogInitialState, { error: action.error });
        case 'CATALOG_CATEGORY_FETCH_RESPONSE':
            return Object.assign({}, catalogInitialState, { category: action.data.category });

        //Products
        case 'CATALOG_ITEMS_FETCH_REQUEST': {
            const newState = {
                category: state.category,
                genericProductId: state.genericProductId,
                fetchingItems: true,
                page: action.page,
                items: state.items,
            };
            if (action.page !== 0) {
                newState.items = state.items;
            }
            return Object.assign({}, catalogInitialState, newState);
        }
        case 'CATALOG_ITEMS_FETCH_ERROR':
            return Object.assign({}, catalogInitialState, { error: action.error });
        case 'CATALOG_ITEMS_FETCH_RESPONSE': {
            if (action.page !== state.page) { return state }
            const newState = { category: state.category, genericProductId: state.genericProductId, page: action.page };
            if (state.items == null) {
                newState.items = action.data;
            } else {
                newState.items = Object.assign({}, state.items);
                newState.items.products = [...(state.items.products || []), ...action.data.products];
                newState.items.options = action.data.options;
                newState.items.total = action.data.total;
            }
            return Object.assign({}, catalogInitialState, newState);
        }
        case 'CATALOG_SELECT_GENERIC_PRODUCT': {
            return Object.assign({}, state, { genericProductId: action.id, items: Object.assign({}, state.items, { products: null, options: null }) });
        }
        case 'CATALOG_TOGGLE_FILTERS':
            return Object.assign({}, state, { showFilters: !state.showFilters });
        case 'NAV_OPEN_PAGE':
            return Object.assign({}, catalogInitialState);
        default:
            return state;
    }
}