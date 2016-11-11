const emptyState = { content: '', fetching: false, error: null };
export default function(state = emptyState, action) {
    switch (action.type) {
        case 'STATIC_PAGE_FETCH_REQUEST':
            return Object.assign({}, emptyState, { fetching: true });
        case 'STATIC_PAGE_FETCH_RESPONSE':
            return Object.assign({}, emptyState, { content: action.data });
        case 'STATIC_PAGE_FETCH_ERROR':
            return Object.assign({}, emptyState, { error: action.error });
        case 'NAV_OPEN_PAGE':
            return Object.assign({}, emptyState);
        default:
            return state;
    }
}