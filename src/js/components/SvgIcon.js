import React from 'react';

const SvgIcon = ({ name, width = 24, height = 24, fill = 'rgba(0,0,0,1)', style }) => {
    let children = null;
    switch (name) {
        case 'check_box_outline_blank':
            children = [
                (<path key={1} d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />),
                (<path key={2} d="M0 0h24v24H0z" fill="none" />),
            ];
            break;
        case 'check_box':
            children = [
                (<path key={1} d="M0 0h24v24H0z" fill="none" />),
                (<path key={2} d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />),
            ];
            break;
    }
    const componentStyle = {
        width,
        height,
        fill,
    };
    return (
        <svg viewBox="0 0 24 24" style={Object.assign({}, componentStyle, style)}>
            {children}
        </svg>
    );
};

export default SvgIcon;