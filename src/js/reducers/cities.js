export default function (state = { list: null, currentId: '' }, action) {
    switch (action.type) {
        case 'CITIES_FETCH_RESPONSE':
            return Object.assign({}, state, { list: action.data });
        case 'CITIES_SELECT': {
            const city = (state.list || []).find(c => c.id === action.id);
            return Object.assign({}, state, { currentId: (city ? city.id : '') });
        }
        default:
            return state;
    }
}