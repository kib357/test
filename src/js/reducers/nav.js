export default function(state = { menu: '', page: '', path: '' }, action) {
    switch (action.type) {
        case 'NAV_TOGGLE_MENU': {
            const menu = state.menu === action.menu ? '' : action.menu;
            //Very bad place to do this, but its simplest
            applyBodyStyle(!!menu);
            return Object.assign({}, state, { menu });
        }
        case 'NAV_OPEN_PAGE': {
            return Object.assign({}, state, { page: action.page, path: action.path });
        }
        default:
            return state;
    }
}

function applyBodyStyle(hideOverflow) {
    document.body.style.overflow = hideOverflow ? 'hidden' : '';
    document.body.style.position = hideOverflow ? 'relative' : '';
    document.body.style.height = hideOverflow ? '100%' : '';
    document.documentElement.style.overflow = hideOverflow ? 'hidden' : '';
    document.documentElement.style.position = hideOverflow ? 'relative' : '';
    document.documentElement.style.height = hideOverflow ? '100%' : '';
}