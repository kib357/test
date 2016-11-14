import React, { Component } from 'react';
import componentClasses from '../../css/productCard.css';
import ProductActions from './ProductActions';


class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = { unitsIndex: 0 };
        this.unitsClickHandler = this._unitsClickHandler.bind(this);
    }

    _unitsClickHandler(unitsIndex) {
        this.setState({ unitsIndex });
    }

    render() {
        const {name, erp_id, uri_name, count_pallet, stock, unit_prices = [], big, onClick} = this.props;
        const {unitsIndex} = this.state;
        const {weight: uWeight, volume: uVolume} = unit_prices[unitsIndex] || {};
        return (
            <div className={componentClasses.wrapper + (this.props.big ? ' ' + componentClasses.big : '')}>
                <div className={componentClasses.header} onTouchTap={onClick} data-uri={uri_name}>
                    <h3 className={componentClasses.primaryText}>{name}</h3>
                    {big && <span className={componentClasses.secondaryText}>Код товара: {erp_id}</span>}
                </div>
                <div className={componentClasses.content}>
                    <div className={componentClasses.media} onTouchTap={onClick} data-uri={uri_name}>
                        <img src={`http://images.sdvor.com/sdvorcom/${big ? '350x350' : '130x130'}/0/${erp_id}.jpg`} />
                    </div>
                    <div className={componentClasses.text}>
                        <div className={componentClasses.secondaryText}>
                            {stock && <span>Остаток: {stock}<br /></span>}
                            {count_pallet && <span>В поддоне: {count_pallet}<br /></span>}
                            {uWeight && <span>Вес: {uWeight + ' '}кг<br /></span>}
                            {uVolume && <span>Объем: {uVolume + ' '}м<sup>3</sup><br /></span>}
                        </div>
                    </div>
                </div>
                <div className={componentClasses.actions}>
                    <ProductActions
                        units={unit_prices}
                        unitsIndex={unitsIndex}
                        onUnitsClick={this.unitsClickHandler}
                        countInPallet={count_pallet}
                        stock={stock}
                        />
                </div>
            </div>
        );
    }
}

export default ProductCard;