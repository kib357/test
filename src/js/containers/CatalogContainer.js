import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CatalogActions from '../actions/CatalogActions';
import { openUri } from '../actions/NavActions';
import Catalog from '../components/Catalog';

const CatalogContainer = connect(
    state => state.catalog,
    dispatch => (bindActionCreators(Object.assign({}, CatalogActions, { openUri }), dispatch))
)(Catalog);

export default CatalogContainer;