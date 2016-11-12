import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductActions from '../actions/ProductActions';
import Product from '../components/Product';

const ProductContainer = connect(
    state => state.product,
    dispatch => (bindActionCreators(ProductActions, dispatch))
)(Product);

export default ProductContainer;