import React, { Component } from 'react';
import Loader from './Loader';
import componentClasses from '../../css/catalog.css';
import ProductCard from './ProductCard';
import CategoryCard from './CategoryCard';
import Breadcrumbs from './Breadcrumbs';

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.backLinkClickHandler = this._backLinkClickHandler.bind(this);
        this.categoryClickHandler = this._categoryClickHandler.bind(this);
        this.productClickHandler = this._productClickHandler.bind(this);
    }

    componentDidMount() {
        this._fetchDataIfNeed();
    }

    componentDidUpdate() {
        this._fetchDataIfNeed();
    }

    _fetchDataIfNeed() {
        const {category, fetchingCategory, items, fetchingItems, error, fetchCategory, fetchItems} = this.props;
        if (error) {
            return;
        }
        if (!category) {
            if (!fetchingCategory && !error) {
                return fetchCategory();
            }
            return;
        }
        if (!items && !fetchingItems && !error) {
            return fetchItems();
        }
    }

    _backLinkClickHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        const uri = e.currentTarget.getAttribute('href');
        this.props.openCategory(uri);
    }

    _categoryClickHandler(e) {
        const uri = e.currentTarget.getAttribute('data-uri');
        this.props.openUri(uri);
    }

    _productClickHandler(e) {
        const id = e.currentTarget.getAttribute('data-id');
        this.props.openProduct(id);
    }

    render() {
        const {items, fetchingCategory, fetchingItems} = this.props;
        return (
            <div className={componentClasses.wrapper}>
                <Loader position="relative" hide={!fetchingCategory && !fetchingItems} />
                {items &&
                    <div>
                        <Breadcrumbs items={items.breadcrumbs} onBackLinkClick={this.backLinkClickHandler} />
                        {Array.isArray(items.sub_categories) ?
                            <div>
                                {items.sub_categories.map((p, i) => (
                                    <CategoryCard key={i} {...p} onClick={this.categoryClickHandler} />
                                ))}
                            </div>
                            :
                            <div>
                                {(items.products || []).map((p, i) => (
                                    <ProductCard key={i} {...p} onClick={this.productClickHandler} />
                                ))}
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

export default Catalog;