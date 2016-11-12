import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as NavActions from '../actions/NavActions';
import CatalogContainer from './CatalogContainer';
import OrderContainer from './OrderContainer';
import ProductContainer from './ProductContainer';
import StaticPageContainer from './StaticPageContainer';

class ContentContainer extends Component {
    componentDidMount() {
        this.props.addHistoryListener();
    }

    render() {
        const {page} = this.props;
        if (!page) { return null }

        let component;
        switch (page) {
            case 'catalog':
                component = <CatalogContainer />;
                break;
            case 'order':
                component = <OrderContainer />;
                break;
            case 'product':
                component = <ProductContainer />;
                break;
            default:
                component = <StaticPageContainer />;
                break;
        }
        return component;
    }
}

const contentContainer = connect(
    state => state.nav,
    dispatch => (bindActionCreators(NavActions, dispatch))
)(ContentContainer);

export default contentContainer;