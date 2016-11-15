export default function (state = { byParent: {}, byId: { '_0': { id: 0, name: 'Каталог', uri_name: '/' } } }, action) {
    switch (action.type) {
        case 'SUBCATEGORIES_FETCH_REQUEST': {
            const byParent = Object.assign({}, state.byParent);
            byParent[action.parentId] = null;
            return Object.assign({}, state, { byParent });
        }
        case 'SUBCATEGORIES_FETCH_RESPONSE': {
            const byParent = Object.assign({}, state.byParent);
            byParent[action.parentId] = action.data;
            const byId = Object.assign({}, state.byId);
            for (let c of action.data) {
                byId['_' + c.id] = c;
            }
            return Object.assign({}, state, { byParent, byId });
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