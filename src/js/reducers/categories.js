export default function(state = { byParent: {} }, action) {
    switch (action.type) {
        case 'SUBCATEGORIES_FETCH_REQUEST': {
            const byParent = Object.assign({}, state.byParent);
            byParent[action.parentId] = null;
            return Object.assign({}, state, { byParent });
        }
        case 'SUBCATEGORIES_FETCH_RESPONSE': {
            const byParent = Object.assign({}, state.byParent);
            byParent[action.parentId] = action.data;
            console.log(typeof action.parentId, byParent);
            return Object.assign({}, state, { byParent });
        }
        case 'SUBCATEGORIES_FETCH_ERROR': {
            const byParent = Object.assign({}, state.byParent);
            byParent[action.parentId] = action.error;
            return Object.assign({}, state, { byParent });
        }
        default:
            return state;
    }
}