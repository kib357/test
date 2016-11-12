const productInitialState = { item: null, fetching: false, error: false };
export default function product(state = productInitialState, action) {
    switch (action.type) {
        case 'PRODUCT_FETCH_REQUEST':
            return Object.assign({}, productInitialState, { fetching: true });
        case 'PRODUCT_FETCH_ERROR':
            return Object.assign({}, productInitialState, { error: action.error });
        case 'PRODUCT_FETCH_RESPONSE':
            return Object.assign({}, productInitialState, { item: action.data });
        case 'NAV_OPEN_PAGE':
            return Object.assign({}, productInitialState);
        default:
            return state;
    }
}