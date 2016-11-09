import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CitiesActions from '../actions/CitiesActions';
import CurrentCity from '../components/CurrentCity';

const CurrentCityContainer = connect(
    (state, props) => Object.assign({}, props, state.cities),
    dispatch => (bindActionCreators(CitiesActions, dispatch))
)(CurrentCity);

export default CurrentCityContainer;