export default function(state = { menu: '', page: '' }, action) {
    switch (action.type) {
        case 'NAV_TOGGLE_MENU': {
            const menu = state.menu === action.menu ? '' : action.menu;
            return Object.assign({}, state, { menu });
        }
        case 'NAV_OPEN_PAGE': {
            return Object.assign({}, state, { page: action.page });
        }
        default:
            return state;
    }
}