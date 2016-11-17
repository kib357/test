import React from 'react';

const icons = {
    'arrow_back': [
        { d: 'M0 0h24v24H0z', fill: 'none' },
        { d: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z' },
    ],
    'check_box_outline_blank': [
        { d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z' },
        { d: 'M0 0h24v24H0z', fill: 'none' },
    ],
    'check_box': [
        { d: 'M0 0h24v24H0z', fill: 'none' },
        { d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
    ],
    'chevron_right': [
        { d: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' },
        { d: 'M0 0h24v24H0z', fill: 'none' },
    ],
    'clear': [
        { d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' },
        { d: 'M0 0h24v24H0z', fill: 'none' },
    ],
};

const SvgIcon = ({ name, width = 24, height = 24, fill = 'rgba(0,0,0,1)', style }) => {
    const componentStyle = {
        width,
        height,
        fill,
    };
    return (
        <svg viewBox="0 0 24 24" style={Object.assign({}, componentStyle, style)}>
            {(icons[name] || []).map((e, i) => (
                <path key={i} d={e.d} fill={e.fill} />
            ))}
        </svg>
    );
};

export default SvgIcon;