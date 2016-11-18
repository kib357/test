import React from 'react';
import SvgIcon from './SvgIcon';
import componentClasses from '../../css/filters.css';
import formsClasses from '../../css/forms.css';

const Filters = ({ value = [], filters, show, toggle, onChange, apply}) => {
    const toggleWrapper = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
    };
    const toggleFilter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const optionId = e.currentTarget.getAttribute('data-option-id');
        const index = value.indexOf(optionId);
        const res = value.slice();
        if (index >= 0) {
            res.splice(index, 1);
        } else {
            res.push(optionId);
        }
        onChange(res);
    };
    return (
        <div className={componentClasses.wrapper + ' ' + (show ? componentClasses.showWrapper : '')}>
            <div className={componentClasses.header}>
                <span>Фильтр товаров</span>
                <a onTouchTap={toggleWrapper}><SvgIcon name="close" /></a>
            </div>
            <div className={componentClasses.filters}>
                <ul>
                    {
                        filters.map((e, i) => (
                            <li key={i} className={componentClasses.optionGroup}>
                                <div className={componentClasses.optionGroupHeader}>{e.property_name}</div>
                                <ul>
                                    {(e.values || []).map((v, j) => (
                                        <li key={i + '-' + j}>
                                            <a
                                                className={componentClasses.option}
                                                onTouchTap={toggleFilter}
                                                data-option-id={v.id}
                                                >
                                                <div className={componentClasses.box}>
                                                    <SvgIcon
                                                        fill={value.indexOf(v.id + '') >= 0 ? '#F57C00' : 'rgba(0,0,0,.54)'}
                                                        name={value.indexOf(v.id + '') >= 0 ? 'check_box' : 'check_box_outline_blank'} />
                                                    <input type="checkbox" value="on" />
                                                </div>
                                                <div>
                                                    {v.value}
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={componentClasses.actions}>
                <button
                    type="button"
                    onTouchTap={toggleWrapper}
                    className={formsClasses.btnFlat}
                    >
                    Отменить
                </button>
                <button
                    type="button"
                    onTouchTap={apply}
                    className={formsClasses.btnFlat}
                    >
                    Применить
                </button>
            </div>
        </div>
    );
};

export default Filters;