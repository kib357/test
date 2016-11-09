const categoriesMenuInitialState = { current: { id: 0 } };
export default function categoriesMenu(state = categoriesMenuInitialState, action) {
    switch (action.type) {
        case 'CATEGORIES_MENU_SELECT':
            return Object.assign({}, state, { current: action.category });
        default:
            return state;
    }
}