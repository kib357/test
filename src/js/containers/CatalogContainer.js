import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CatalogActions from '../actions/CatalogActions';
import { openUri } from '../actions/NavActions';
import Catalog from '../components/Catalog';

const CatalogContainer = connect(
    state => {
        const cState = state.catalog;
        return Object.assign({}, cState, {
            hasPages: cState.items != null && cState.items.products != null && cState.items.total > ((cState.page + 1) * cState.pageSize),
            fetching: cState.fetchingCategory || cState.fetchingItems,
        });
    },
    dispatch => (bindActionCreators(Object.assign({}, CatalogActions, { openUri }), dispatch))
)(Catalog);

export default CatalogContainer;