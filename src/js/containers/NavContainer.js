import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as NavActions from "../actions/NavActions";
import Nav from "../components/Nav";

const NavContainer = connect(
    state => state.nav,
    dispatch => (bindActionCreators(NavActions, dispatch))
)(Nav);

export default NavContainer;