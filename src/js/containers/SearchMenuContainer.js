import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SearchActions from '../actions/SearchActions';
import SearchMenu from '../components/SearchMenu';

const SearchMenuContainer = connect(
    state => state.searchMenu,
    dispatch => (bindActionCreators(SearchActions, dispatch))
)(SearchMenu);

export default SearchMenuContainer;