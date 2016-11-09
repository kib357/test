import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CategoriesActions from '../actions/CategoriesActions';
import CategoriesMenu from '../components/CategoriesMenu';

const CategoriesMenuContainer = connect(
    state => {
        const items = state.categories.byParent['_' + state.categoriesMenu.currentParentId];
        console.log('!!!', items);
        return {
            items,
            fetching: items === null,
            error: (typeof items === 'string' ? items : null),
        };
    },
    dispatch => (bindActionCreators(CategoriesActions, dispatch))
)(CategoriesMenu);

export default CategoriesMenuContainer;