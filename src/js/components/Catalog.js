import React, { Component } from 'react';
import Loader from './Loader';
import componentClasses from '../../css/catalog.css';

class Catalog extends Component {
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

    render() {
        const {items, fetchingCategory, fetchingItems} = this.props;
        return (
            <div className={componentClasses.wrapper}>
                <Loader position="relative" hide={!fetchingCategory && !fetchingItems} />
                {items && items.products && <ul>
                    {
                        items.products.map(p => <li>{p.name}</li>)
                    }
                </ul>}
            </div>
        );
    }
}

export default Catalog;