import React from 'react';

const Breadcrumbs = ({items, onBackLinkClick}) => {
    if (!Array.isArray(items) || items.length < 1) {
        return null;
    }
    items = items.slice();
    const currentCategory = items.pop();
    let backLink = null;
    if (items.length > 0) {
        const d = items.pop();
        backLink = <a href={d.path} onClick={onBackLinkClick}>{d.name}</a>;
    } else if (currentCategory.parent_id == 0) {
        backLink = <a href="" onClick={onBackLinkClick}>каталог</a>;
    }
    return (
        <div>
            {backLink}
            <h2>{currentCategory.name}</h2>
        </div>
    );
};

export default Breadcrumbs;