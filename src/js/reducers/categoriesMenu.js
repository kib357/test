const categoriesMenuInitialState = { currentParentId: 0 };
export default function categoriesMenu(state = categoriesMenuInitialState, action) {
    switch (action.type) {
        case 'CATEGORIES_MENU_SELECT':
            return Object.assign({}, state, { currentParentId: action.id });
        default:
            return state;
    }
}