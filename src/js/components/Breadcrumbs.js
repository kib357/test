import React from 'react';
import componentClasses from '../../css/breadcrumbs.css';

const arrowLeft = '\u2190\u00A0';
const Breadcrumbs = ({items, category, total, onBackLinkClick}) => {
    if (!Array.isArray(items) || items.length < 1) {
        return null;
    }
    items = items.slice();
    let currentCategory;
    if (category) {
        currentCategory = items.pop();
    }
    const d = items.pop() || { name: 'Каталог', path: '' };
    return (
        <div className={componentClasses.wrapper}>
            <div className={componentClasses.linksWrapper}>
                <a href={d.path} onClick={onBackLinkClick}>{arrowLeft + d.name}</a>
            </div>
            {category &&
                <div className={componentClasses.header}>
                    <h1>{currentCategory.name}</h1>
                    {total && <span>{total}</span>}
                </div>
            }
        </div>
    );
};

export default Breadcrumbs;