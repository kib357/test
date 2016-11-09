import { connect } from 'react-redux';
import Helmet from 'react-helmet';

const HelmetContainer = connect(
    (state, props) => Object.assign({}, props, state.helmet),
    () => ({})
)(Helmet);

export default HelmetContainer;