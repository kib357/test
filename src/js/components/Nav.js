import React from 'react';
import navClasses from '../../css/nav.css';
import SvgIcon from './SvgIcon';

const items = [
    { name: 'Каталог', icon: 'menu', value: 'categories' },
    { name: 'Поиск', icon: 'search', value: 'search' },
    { name: 'Инфо', icon: 'phone', value: 'info' },
    { name: 'Корзина', icon: 'shopping_cart', value: 'cart' },
];

const Nav = ({menu, min, toggleMenu}) => {
    return (
        <div className={navClasses.wrapper}>
            {
                items.map((e, i) => (
                    <div key={i}
                        onTouchTap={toggleMenu}
                        data-menu={e.value}
                        className={e.value === menu ? navClasses.active : ''}
                        >
                        <SvgIcon name={e.icon} fill="#424242" />
                        <span className={min ? navClasses.hideTitle : ''}>{e.name}</span>
                    </div>
                ))
            }
        </div>
    );
};

export default Nav;