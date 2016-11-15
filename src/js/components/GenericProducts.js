import React from 'react';
import selectClasses from '../../css/select.css';

const GenericProducts = ({products, value, onChange}) => {
    return (
        <div className={selectClasses.wrapper}>
            <select
                value={value}
                onChange={onChange}
                style={{ width: '100%' }}
                className={selectClasses.element}
                >
                <option key={-1} value="">Все товары</option>
                {
                    products.map((p, i) => (
                        <option key={i} value={p.id}>{decodeURIComponent(p.name)}</option>
                    ))
                }
            </select>
            <div className={selectClasses.arrow}></div>
        </div>
    );
};

export default GenericProducts;