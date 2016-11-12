import React from 'react';
import componentClasses from '../../css/breadcrumbs.css';

const arrowLeft = '\u2190\u00A0';
const Breadcrumbs = ({items, onBackLinkClick}) => {
    if (!Array.isArray(items) || items.length < 1) {
        return null;
    }
    items = items.slice();
    const currentCategory = items.pop();
    const d = items.pop() || { name: 'Каталог', path: '' };
    return (
        <div>
            <div className={componentClasses.linksWrapper}>
                <a href={d.path} onClick={onBackLinkClick}>{arrowLeft + d.name}</a>
            </div>
            <h1 className={componentClasses.header}>{currentCategory.name}</h1>
        </div>
    );
};

export default Breadcrumbs;