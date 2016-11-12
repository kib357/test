import React, { Component } from 'react';
import componentClasses from '../../css/product.css';
import Breadcrumbs from './Breadcrumbs';
import Loader from './Loader';
import ProductCard from './ProductCard';

class Product extends Component {
    constructor(props) {
        super(props);
        this.backLinkClickHandler = this._backLinkClickHandler.bind(this);
    }

    componentDidMount() {
        this._fetchDataIfNeed();
    }

    componentDidUpdate() {
        this._fetchDataIfNeed();
    }

    _fetchDataIfNeed() {
        const {item, fetching, error, fetchProduct} = this.props;
        if (item == null && !fetching && !error) {
            fetchProduct();
        }
    }

    _backLinkClickHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        const uri = e.currentTarget.getAttribute('href');
        this.props.openCategory(uri);
    }

    render() {
        const {item, fetching} = this.props;
        return (
            <div className={componentClasses.wrapper}>
                <Loader position="relative" hide={!fetching} />
                {item &&
                    <div>
                        <Breadcrumbs items={item.breadcrumbs} onBackLinkClick={this.backLinkClickHandler} />
                        <ProductCard {...item.products[0]} />
                    </div>
                }
            </div>
        );
    }
}

export default Product;