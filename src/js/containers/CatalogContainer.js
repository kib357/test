import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as NavActions from '../actions/NavActions';
import Catalog from '../components/Catalog';

const CatalogContainer = connect(
    state => state,
    dispatch => (bindActionCreators(NavActions, dispatch))
)(Catalog);

export default CatalogContainer;