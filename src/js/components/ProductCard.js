import React, { Component } from 'react';
import removeIcon from '../../../public/img/remove.svg';
import addIcon from '../../../public/img/add.svg';
import componentClasses from '../../css/productCard.css';
import formsClasses from '../../css/forms.css';
import RubSymbol from './RubSymbol';

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 1, unitsIndex: 0 };
        this.countChangeHandler = this._countChangeHandler.bind(this);
        this.countDecHandler = this._countDecHandler.bind(this);
        this.countIncHandler = this._countIncHandler.bind(this);
        this.byClickHandler = this._byClickHandler.bind(this);
        this.countInputBlurHandler = this._countInputBlurHandler.bind(this);
        this.unitsClickHandler = this._unitsClickHandler.bind(this);
    }

    _countChangeHandler(e) {
        const v = e.target.value.replace(/\D/g, '') * 1;
        if (Number.isFinite(v)) {
            this.setState({ count: v });
        }
    }

    _countInputBlurHandler() {
        if (this.state.count < 1) {
            this.setState({ count: 1 });
        }
    }

    _countDecHandler() {
        this.setState({ count: Math.max(this.state.count - 1, 1) });
    }

    _countIncHandler() {
        this.setState({ count: this.state.count + 1 });
    }

    _byClickHandler() {
        this.setState({ count: 1 });
    }

    _unitsClickHandler(e) {
        const unitsIndex = e.currentTarget.getAttribute('data-index') * 1;
        this.setState({ unitsIndex });
    }

    render() {
        const {name, erp_id, unit_prices = []} = this.props;
        const {unitsIndex, count} = this.state;
        const {weight: uWeight, price: uPrice, volume: uVolume} = unit_prices[unitsIndex] || {};
        return (
            <div className={componentClasses.wrapper}>
                <div className={componentClasses.content}>
                    <div className={componentClasses.text}>
                        <h3 className={componentClasses.primaryText}>{name}</h3>
                        <div className={componentClasses.secondaryText}>
                            {uWeight && <span>Вес: {uWeight + ' '}кг<br /></span>}
                            {uVolume && <span>Объем: {uVolume + ' '}м<sup>3</sup><br /></span>}
                        </div>
                    </div>
                    <div className={componentClasses.media}>
                        <img src={`http://images.sdvor.com/sdvorcom/130x130/0/${erp_id}.jpg`} />
                    </div>
                </div>
                {uPrice &&
                    <div className={componentClasses.price}>
                        <span className={componentClasses.sum}>
                            {((uPrice * count).toFixed(2) || '–')}
                            <RubSymbol />
                        </span>
                        {(count > 1) &&
                            <span className={componentClasses.secondaryText}>
                                {uPrice.toFixed(2)}<RubSymbol />{' x ' + count}
                            </span>
                        }
                        <div className={componentClasses.units}>
                            {unit_prices.map((e, i) => (
                                <span
                                    key={i}
                                    data-index={i}
                                    onTouchTap={this.unitsClickHandler}
                                    className={(unitsIndex === i ? componentClasses.activeUnits : '')}
                                    >
                                    {e.name}
                                </span>
                            ))}
                        </div>
                    </div>
                }
                {uPrice ?
                    <div className={componentClasses.actions}>
                        <button
                            type="button"
                            className={formsClasses.btn + ' ' + componentClasses.countBtn}
                            onTouchTap={this.countDecHandler}
                            >
                            <img src={removeIcon} />
                        </button>
                        <input
                            type="text"
                            pattern="\d*"
                            value={count}
                            onChange={this.countChangeHandler}
                            onBlur={this.countInputBlurHandler}
                            className={formsClasses.textInput + ' ' + componentClasses.countInput}
                            />
                        <button
                            type="button"
                            className={formsClasses.btn + ' ' + componentClasses.countBtn}
                            onTouchTap={this.countIncHandler}
                            >
                            <img src={addIcon} />
                        </button>
                        <div className={componentClasses.byBtnWrapper}>
                            <button
                                onTouchTap={this.byClickHandler}
                                type="button"
                                className={formsClasses.btn + ' ' + componentClasses.byBtn}
                                >
                                купить
                        </button>
                        </div>
                    </div>
                    :
                    <div className={componentClasses.actions}>
                        <div className={componentClasses.byBtnWrapper}>
                            <button
                                type="button"
                                className={formsClasses.btn}
                                >
                                Узнать цену
                        </button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default ProductCard;