import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as StaticPageActions from '../actions/StaticPageActions';
import InfoMenu from '../components/InfoMenu';

const InfoMenuContainer = connect(
    () => ({}),
    dispatch => (bindActionCreators(StaticPageActions, dispatch))
)(InfoMenu);

export default InfoMenuContainer;