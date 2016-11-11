import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CatalogActions from '../actions/CatalogActions';
import Catalog from '../components/Catalog';

const CatalogContainer = connect(
    state => state.catalog,
    dispatch => (bindActionCreators(CatalogActions, dispatch))
)(Catalog);

export default CatalogContainer;