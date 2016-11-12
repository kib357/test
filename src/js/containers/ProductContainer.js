import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openCategory } from '../actions/CatalogActions';
import * as ProductActions from '../actions/ProductActions';
import Product from '../components/Product';

const ProductContainer = connect(
    state => state.product,
    dispatch => (bindActionCreators(Object.assign({}, ProductActions, { openCategory }), dispatch))
)(Product);

export default ProductContainer;