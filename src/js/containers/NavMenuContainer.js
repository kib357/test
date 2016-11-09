import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as NavActions from '../actions/NavActions';
import headerClasses from '../../css/header.css';
import CategoriesMenuContainer from './CategoriesMenuContainer';

class NavMenuContainer extends Component {
    constructor(props) {
        super(props);
        this.closeMenu = this._closeMenu.bind(this);
    }

    _closeMenu(e) {
        if (e.target === e.currentTarget) {
            this.props.toggleMenu(e);
        }
    }

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
                component = <p style={{ padding: '0 9px' }}>Похоже, тут ничего нет...</p>;
                break;
        }
        return (
            <div className={headerClasses.navMenuWrapper} onClick={this.closeMenu}>
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