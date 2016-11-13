const searchMenuInitialState = { query: '', fetching: false, error: null, results: null };
export default function searchMenu(state = searchMenuInitialState, action) {
    switch (action.type) {
        case 'SEARCH_RESULTS_FETCH_REQUEST':
            return Object.assign({}, searchMenuInitialState, { query: action.query, fetching: true });
        case 'SEARCH_RESULTS_FETCH_ERROR':
            if (action.query !== state.query) { return state }
            return Object.assign({}, searchMenuInitialState, { query: state.query, error: action.error });
        case 'SEARCH_RESULTS_FETCH_RESPONSE':
            if (action.query !== state.query) { return state }
            return Object.assign({}, searchMenuInitialState, {
                query: state.query,
                results: action.data.generic_products || [],
            });
        case 'SEARCH_CLEAR':
            return Object.assign({}, searchMenuInitialState);
        default:
            return state;
    }
}