import React from 'react';
import selectClasses from '../../css/select.css';

const GenericProducts = ({products, value, total, onChange}) => {
    return (
        <div className={selectClasses.wrapper}>
            <select
                value={value}
                onChange={onChange}
                style={{ width: '100%' }}
                className={selectClasses.element}
                >
                <option key={-1} value="">{`Все товары – ${total}`}</option>
                {
                    products.map((p, i) => (
                        <option key={i} value={p.id}>{`${p.name} – ${p.doc_count}`}</option>
                    ))
                }
            </select>
            <div className={selectClasses.arrow}></div>
        </div>
    );
};

export default GenericProducts;