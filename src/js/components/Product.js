import React, { Component } from 'react';
import componentClasses from '../../css/product.css';
import formsClasses from '../../css/forms.css';
import Breadcrumbs from './Breadcrumbs';
import Loader from './Loader';
import ProductCard from './ProductCard';

const getShopInfo = (e, i) => (<div key={i} className={componentClasses.shop}>
    <div className={componentClasses.shopAddress}>{e.address}</div>
    <div className={componentClasses.shopInfo}>
        <span>{e.working_hours}</span>
        {e.stock && <div>
            <span>Остаток:</span> <span className={componentClasses.count}>{e.stock}</span>
        </div>}
    </div>
</div>);

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = { tab: 0 };
        this.backLinkClickHandler = this._backLinkClickHandler.bind(this);
        this.showTab = this._showTab.bind(this);
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

    _showTab(e) {
        const tab = e.currentTarget.getAttribute('data-tab') * 1;
        this.setState({ tab });
    }

    render() {
        const {item, fetching} = this.props;
        if (fetching || (item == null)) {
            return <div className={componentClasses.wrapper}>
                <Loader position="relative" hide={!fetching} />
            </div>;
        }
        const product = item.products[0];
        const hasDesc = Array.isArray(product.descriptions) && product.descriptions[0] != null && product.descriptions[0].text;
        return (
            <div className={componentClasses.wrapper}>
                <Loader position="relative" hide={!fetching} />
                <div>
                    <Breadcrumbs items={item.breadcrumbs} onBackLinkClick={this.backLinkClickHandler} />
                    <br />
                    <ProductCard {...product} big={true} />
                    <div className={componentClasses.detailsWrapper}>
                        <div className={componentClasses.tabSwitchers}>
                            <button type="button"
                                onClick={this.showTab}
                                data-tab="0"
                                className={formsClasses.btn + (this.state.tab === 0 ? ' ' + componentClasses.active : '')}
                                >
                                В магазинах
                            </button>
                            <button type="button"
                                onClick={this.showTab}
                                data-tab="1"
                                className={formsClasses.btn + (this.state.tab === 1 ? ' ' + componentClasses.active : '')}
                                >
                                Описание
                            </button>
                        </div>
                        {this.state.tab === 0 &&
                            <div>
                                <p>Cейчас:</p>
                                {product.shops
                                    .filter(s => s.stock > 0)
                                    .map(getShopInfo)}
                                <p>Доставим Вам товар точно в оговорённое время:</p>
                                {item.shops
                                    .filter(s => product.shops.findIndex(ps => ps.shop_id === s.shop_id && ps.stock > 0) < 0)
                                    .map(getShopInfo)}
                            </div>
                        }
                        {this.state.tab === 1 && hasDesc &&
                            <div className={componentClasses.desc}>
                                {hasDesc ? product.descriptions[0].text : 'Описание ещё не заполнено.'}
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;