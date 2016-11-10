import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as NavActions from '../actions/NavActions';
import Order from '../components/Order';

const OrderContainer = connect(
    state => state,
    dispatch => (bindActionCreators(NavActions, dispatch))
)(Order);

export default OrderContainer;