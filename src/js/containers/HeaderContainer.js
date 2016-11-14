import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as NavActions from '../actions/NavActions';
import Header from '../components/Header';

const HeaderContainer = connect(
    state => state.nav,
    dispatch => (bindActionCreators(NavActions, dispatch))
)(Header);

export default HeaderContainer;