import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as StaticPageActions from '../actions/StaticPageActions';
import StaticPage from '../components/StaticPage';

const StaticPageContainer = connect(
    state => Object.assign({}, state.staticPage, { pageName: state.nav.page }),
    dispatch => (bindActionCreators(StaticPageActions, dispatch))
)(StaticPage);

export default StaticPageContainer;