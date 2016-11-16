import React from 'react';
import closeIcon from '../../../public/img/clear.svg';
import componentClasses from '../../css/filters.css';

const Filters = ({filters, show, toggle}) => {
    const toggleWrapper = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
    };
    return (
        <div className={componentClasses.wrapper + ' ' + (show ? componentClasses.showWrapper : '')}>
            <div className={componentClasses.header}>
                <span>Фильтр товаров</span>
                <a onTouchTap={toggleWrapper}><img src={closeIcon} /></a>
            </div>
            {
                filters.map((e, i) => (
                    <div key={i}>
                        <label>{e.property_name}</label>
                    </div>
                ))
            }
        </div>
    );
};

export default Filters;