import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as StaticPageActions from '../actions/StaticPageActions';
import StaticPage from '../components/StaticPage';

const StaticPageContainer = connect(
    state => state.staticPage,
    dispatch => (bindActionCreators(StaticPageActions, dispatch))
)(StaticPage);

export default StaticPageContainer;