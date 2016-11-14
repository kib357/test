import React, { Component } from 'react';
import Loader from './Loader';
import componentClasses from '../../css/catalog.css';
import formsClasses from '../../css/forms.css';
import ProductCard from './ProductCard';
import CategoryCard from './CategoryCard';
import Breadcrumbs from './Breadcrumbs';
import ScrollButton from './ScrollButton';

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
        const uri = e.currentTarget.getAttribute('data-uri');
        this.props.openProduct(uri);
    }

    render() {
        const {items, category, error, page, fetching, hasPages, fetchNextPage} = this.props;
        return (
            <div className={componentClasses.wrapper}>
                {items &&
                    <div>
                        <Breadcrumbs
                            items={items.breadcrumbs}
                            category={true}
                            total={items.total}
                            onBackLinkClick={this.backLinkClickHandler}
                            />
                        {category.name &&
                            <div className={componentClasses.header}>
                                <h1>{category.name}</h1>
                                {!Array.isArray(items.sub_categories) && items.total && <span>{items.total}</span>}
                            </div>
                        }
                        {/*Search results*/}
                        {(category.id === '-1' && category.phrase && category.generic_name) ?
                            <div className={formsClasses.secondaryLabel}>
                                {`по фразе '${category.phrase}' в разделе '${category.generic_name}'`}
                            </div>
                            :
                            null
                        }
                        {Array.isArray(items.sub_categories) ?
                            <div className={componentClasses.itemsWrapper}>
                                {items.sub_categories.map((p, i) => (
                                    <CategoryCard key={i} {...p} onClick={this.categoryClickHandler} />
                                ))}
                            </div>
                            :
                            <div className={componentClasses.itemsWrapper}>
                                <div>
                                    {(items.products || []).map((p, i) => (
                                        <ProductCard key={i} {...p} onClick={this.productClickHandler} />
                                    ))}
                                </div>
                                {hasPages &&
                                    <div className={componentClasses.fetchMore}>
                                        <ScrollButton
                                            fetching={fetching}
                                            label={fetching ? 'Загрузка...' : 'Загрузить ещё'}
                                            autoLoad={page > 0}
                                            onClick={fetchNextPage}
                                            />
                                    </div>}
                            </div>
                        }
                    </div>
                }
                <Loader position="relative" hide={!fetching || (page > 0)} />
                {error && <p>{error}</p>}
            </div>
        );
    }
}

export default Catalog;