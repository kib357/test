import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CategoriesActions from '../actions/CategoriesActions';
import CategoriesMenu from '../components/CategoriesMenu';

const CategoriesMenuContainer = connect(
    state => {
        const current = state.categoriesMenu.current;
        const items = state.categories.byParent['_' + current.id];
        return {
            items,
            current,
            fetching: items === null,
            error: (typeof items === 'string' ? items : null),
        };
    },
    dispatch => (bindActionCreators(CategoriesActions, dispatch))
)(CategoriesMenu);

export default CategoriesMenuContainer;