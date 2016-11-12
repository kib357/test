import React, { Component } from 'react';
import removeIcon from '../../../public/img/remove.svg';
import addIcon from '../../../public/img/add.svg';
import componentClasses from '../../css/productCard.css';
import formsClasses from '../../css/forms.css';

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 1, unitIndex: 0 };
        this.countChangeHandler = this._countChangeHandler.bind(this);
        this.countDecHandler = this._countDecHandler.bind(this);
        this.countIncHandler = this._countIncHandler.bind(this);
    }

    _countChangeHandler(e) {
        const v = e.target.value.replace(/\D/g, '') * 1;
        if (Number.isFinite(v)) {
            this.setState({ count: v });
        }
    }

    _countDecHandler() {
        this.setState({ count: Math.max(this.state.count - 1, 0) });
    }

    _countIncHandler() {
        this.setState({ count: this.state.count + 1 });
    }

    render() {
        const {name, erp_id, unit_prices} = this.props;
        const {weight: uWeight, price: uPrice, name: uName} = (unit_prices[this.state.unitIndex] || {});
        uWeight;
        uName;
        return (
            <div className={componentClasses.wrapper}>
                <div className={componentClasses.content}>
                    <div className={componentClasses.text}>
                        <h3 className={componentClasses.primaryText}>{name}</h3>
                    </div>
                    <div className={componentClasses.media}>
                        <img src={`http://images.sdvor.com/sdvorcom/130x130/0/${erp_id}.jpg`} />
                    </div>
                </div>
                <div className={componentClasses.price}>
                    <span className={componentClasses.sum}>
                        {(uPrice * this.state.count || '–') + '\u00A0\u20BD\u00A0'}
                    </span>
                    <span className={componentClasses.secondaryText}>
                        {(this.state.count > 1) && `(${uPrice}\u00A0\u20BD x ${this.state.count})`}
                    </span>
                </div>
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
                        value={this.state.count}
                        onChange={this.countChangeHandler}
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
                            type="button"
                            className={formsClasses.btn + ' ' + componentClasses.byBtn}
                            >
                            купить
                </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductCard;