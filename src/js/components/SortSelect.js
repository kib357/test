import React from 'react';
import selectClasses from '../../css/select.css';

const SortSelect = ({value, onChange}) => {
    return (
        <div>
            <label htmlFor="catalog-sort-select" className={selectClasses.label}>
                Сортировать по:
        </label>
            <div className={selectClasses.wrapper}>
                <select
                    value={value}
                    onChange={onChange}
                    className={selectClasses.element}
                    id="catalog-sort-select"
                    >
                    <option value="0">названию</option>
                    <option value="1">популярности</option>
                    <option value="2">увеличению цены</option>
                    <option value="3">уменьшению цены</option>
                </select>
                <div className={selectClasses.arrow}></div>
            </div>
        </div>
    );
};

export default SortSelect;