import React from 'react';
import navClasses from '../../css/nav.css';
import menuIcon from '../../../public/img/menu.svg';
import searchIcon from '../../../public/img/search.svg';
import phoneIcon from '../../../public/img/phone.svg';
import cartIcon from '../../../public/img/cart.svg';

const items = [
    { name: 'Каталог', icon: menuIcon, value: 'categories' },
    { name: 'Поиск', icon: searchIcon, value: 'search' },
    { name: 'Инфо', icon: phoneIcon, value: 'info' },
    { name: 'Корзина', icon: cartIcon, value: 'cart' },
];

const Nav = ({menu, toggleMenu}) => {
    return (
        <div className={navClasses.wrapper}>
            {
                items.map((e, i) => (
                    <div key={i}
                        onTouchTap={toggleMenu}
                        data-menu={e.value}
                        className={e.value === menu ? navClasses.active : ''}
                        >
                        <img src={e.icon} alt={e.value} />
                        <span>{e.name}</span>
                    </div>
                ))
            }
        </div>
    );
};

export default Nav;