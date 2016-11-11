import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as NavActions from '../actions/NavActions';
import StaticPage from '../components/StaticPage';

const StaticPageContainer = connect(
    state => state.nav,
    dispatch => (bindActionCreators(NavActions, dispatch))
)(StaticPage);

export default StaticPageContainer;