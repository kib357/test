import React, { Component } from 'react';
import Loader from './Loader';
import componentClasses from '../../css/catalog.css';
import formsClasses from '../../css/forms.css';
import SvgIcon from './SvgIcon';
import ProductCard from './ProductCard';
import CategoryCard from './CategoryCard';
import Breadcrumbs from './Breadcrumbs';
import Filters from './Filters';
import GenericProducts from './GenericProducts';
import SortSelect from './SortSelect';
import ScrollButton from './ScrollButton';

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.backLinkClickHandler = this._backLinkClickHandler.bind(this);
        this.categoryClickHandler = this._categoryClickHandler.bind(this);
        this.productClickHandler = this._productClickHandler.bind(this);
        this.generictProductChangeHandler = this._generictProductChangeHandler.bind(this);
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
        if ((!items || !items.products) && !fetchingItems && !error) {
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

    _generictProductChangeHandler(e) {
        this.props.selectGenericProduct(e.target.value);
    }

    render() {
        const {
            items,
            category,
            filtersDraft,
            filtersOpened,
            genericProductId,
            error,
            page,
            fetching,
            hasPages,
            fetchNextPage,
            changeFilters,
            toggleFilters,
            applyFilters,
            sortType,
            selectSortType,

        } = this.props;
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
                                {/*!Array.isArray(items.sub_categories) && items.total && <span>{items.total}</span>*/}
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
                        {!Array.isArray(items.sub_categories) &&
                            <div>
                                {Array.isArray(items.generic_products) && items.generic_products.length > 1 &&
                                    <div className={componentClasses.genericProductWrapper}>
                                        <GenericProducts
                                            products={items.generic_products}
                                            value={genericProductId}
                                            total={items.total}
                                            onChange={this.generictProductChangeHandler}
                                            />
                                    </div>
                                }
                                {Array.isArray(items.options) && items.options.length > 0 &&
                                    <div>
                                        <button
                                            type="button"
                                            onTouchTap={toggleFilters}
                                            className={formsClasses.btn + ' ' + componentClasses.filtersBtn}
                                            >
                                            <SvgIcon name="filter_list" />
                                            Уточнить условия
                                    </button>
                                        <Filters
                                            show={filtersOpened}
                                            toggle={toggleFilters}
                                            filters={items.options}
                                            value={filtersDraft}
                                            onChange={changeFilters}
                                            apply={applyFilters}
                                            />
                                    </div>
                                }
                                <div className={componentClasses.sortWrapper}>
                                    <SortSelect value={sortType} onChange={selectSortType} />
                                </div>
                            </div>
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