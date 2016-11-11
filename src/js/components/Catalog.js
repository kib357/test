import React, { Component } from 'react';
import Loader from './Loader';
import componentClasses from '../../css/catalog.css';
import ProductCard from './ProductCard';

class Catalog extends Component {
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
        const p = e.currentTarget.getAttribute('href');
        this.props.openCategory(p);
    }

    render() {
        const {items, category, fetchingCategory, fetchingItems} = this.props;
        let backLink = null;
        if (items && items.breadcrumbs && items.breadcrumbs.length > 1) {
            const d = items.breadcrumbs[items.breadcrumbs.length - 2];
            backLink = <a href={d.path} onClick={this.backLinkClickHandler}>назад в {d.name}</a>;
        }
        return (
            <div className={componentClasses.wrapper}>
                <Loader position="relative" hide={!fetchingCategory && !fetchingItems} />
                {backLink}
                {category && <h2>{category.name}</h2>}
                {items && items.products && <div>
                    {
                        items.products.map((p, i) => (<ProductCard key={i} {...p} />))
                    }
                </div>}
            </div>
        );
    }
}

export default Catalog;