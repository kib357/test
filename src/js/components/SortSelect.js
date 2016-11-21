import React from 'react';
import selectClasses from '../../css/select.css';

const styles = {
    wrapper: {
        // width: '155px',
    },
};

const SortSelect = ({value, onChange}) => {
    const selectChangeHandler = (e) => {
        const value = e.currentTarget.value;
        onChange(value);
    };
    return (
        <div style={styles.wrapper}>
            {/*<label htmlFor="catalog-sort-select" className={selectClasses.label}>
                Сортировать по:
            </label>*/}
            <div className={selectClasses.wrapper}>
                <select
                    value={value}
                    onChange={selectChangeHandler}
                    className={selectClasses.element}
                    id="catalog-sort-select"
                    >
                    {/*<option value="0">названию</option>
                    <option value="1">популярности</option>
                    <option value="2">увеличению цены</option>
                    <option value="3">уменьшению цены</option>*/}
                    <option value="default">По релевантности</option>
                    <option value="name">По названию</option>
                    <option value="popularity">По популярности</option>
                    <option value="price">По возрастанию цены</option>
                    <option value="priceDesc">По уменьшению цены</option>
                </select>
                <div className={selectClasses.arrow}></div>
            </div>
        </div>
    );
};

export default SortSelect;