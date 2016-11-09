import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as NavActions from '../actions/NavActions';
import headerClasses from '../../css/header.css';
import CategoriesMenuContainer from './CategoriesMenuContainer';

class NavMenuContainer extends Component {
    render() {
        const {menu} = this.props;
        let component;
        switch (menu) {
            case 'categories':
                component = <CategoriesMenuContainer />;
                break;
            // case "search":
            //     break;
            // case "info":
            //     break;
            // case "cart":
            //     break;
            default:
                component = <p>Похоже, тут ничего нет...</p>;
                break;
        }
        return (
            <div className={headerClasses.navMenuWrapper}>
                <div className={headerClasses.navMenuComponentWrapper}>
                    <div>
                        {component}
                    </div>
                </div>
            </div>
        );
    }
}

const navMenuContainer = connect(
    state => state.nav,
    dispatch => (bindActionCreators(NavActions, dispatch))
)(NavMenuContainer);

export default navMenuContainer;