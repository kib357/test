import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as StaticPageActions from '../actions/StaticPageActions';
import { openUri } from '../actions/NavActions';
import StaticPage from '../components/StaticPage';

const StaticPageContainer = connect(
    state => Object.assign({}, state.staticPage, { pageName: state.nav.page }),
    dispatch => (bindActionCreators(Object.assign({ openUri }, StaticPageActions), dispatch))
)(StaticPage);

export default StaticPageContainer;