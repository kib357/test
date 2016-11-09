export default function (state = { menu: '' }, action) {
    switch (action.type) {
        case 'NAV_TOGGLE_MENU': {
            const menu = state.menu === action.menu ? '' : action.menu;
            return Object.assign({}, state, { menu });
        }
        default:
            return state;
    }
}