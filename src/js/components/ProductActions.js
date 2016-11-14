import React, { Component } from 'react';
import formsClasses from '../../css/forms.css';
import RubSymbol from './RubSymbol';
import removeIcon from '../../../public/img/remove.svg';
import addIcon from '../../../public/img/add.svg';
import componentClasses from '../../css/productActions.css';

class ProductActions extends Component {
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

    _cutCount(_count) {
        const {countInPallet, stock, units = [], unitsIndex} = this.props;
        const isPalette = (units[unitsIndex] || {}).id === 'PAL';
        const max = Math.ceil(isPalette ? stock / countInPallet : stock);
        return Math.min(max, _count);
    }

    _countChangeHandler(e) {
        const v = e.target.value.replace(/\D/g, '') * 1;
        if (Number.isFinite(v)) {
            this.setState({ count: this._cutCount(v) });
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
        this.setState({ count: this._cutCount(this.state.count + 1) });
    }

    _byClickHandler() {
        this.setState({ count: 1 });
    }

    _unitsClickHandler(e) {
        const unitsIndex = e.currentTarget.getAttribute('data-index') * 1;
        this.props.onUnitsClick(unitsIndex);
    }

    render() {
        const {units = [], unitsIndex} = this.props;
        const {price} = units[unitsIndex] || {};
        const {count} = this.state;
        if (!price) {
            return <div>
                <div className={componentClasses.byBtnWrapper}>
                    <button type="button" className={formsClasses.btn}>Узнать цену</button>
                </div>
            </div>;
        }
        return (
            <div>
                <div className={componentClasses.price}>
                    <span className={componentClasses.sum}>
                        {((price * count).toFixed(2) || '–')}
                        <RubSymbol />
                    </span>
                    {(count > 1) &&
                        <span className={componentClasses.sumInfo}>
                            {price.toFixed(2)}<RubSymbol />{' x ' + count}
                        </span>
                    }
                    <div className={componentClasses.units}>
                        {units.map((e, i) => (
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
            </div>
        );
    }
}

export default ProductActions;