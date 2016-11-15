const categoriesMenuInitialState = {
    current: { id: 0, name: 'Каталог' },
    parentCategories: [],
    openedCategories: [{ id: 0, name: 'Каталог' }],
};
export default function categoriesMenu(state = categoriesMenuInitialState, action) {
    switch (action.type) {
        case 'CATEGORIES_MENU_SELECT': {
            const openedCategories = state.openedCategories.slice();
            if (openedCategories.findIndex(c => c.id === action.category.id) < 0) {
                openedCategories.push(action.category);
            }

            const parentCategories = state.parentCategories.slice();
            if (parentCategories.length > 0 && parentCategories[parentCategories.length - 1] === action.category.id) {
                parentCategories.pop();
            } else {
                parentCategories.push(state.current.id);
            }

            return Object.assign({}, state, { current: action.category, openedCategories, parentCategories });
        }
        default:
            return state;
    }
}