import React from 'react';
import navListClasses from '../../css/navList.css';
import componentClasses from '../../css/infoMenu.css';

const InfoMenu = ({openPage}) => {
    const clickHandler = (e) => {
        const page = e.currentTarget.getAttribute('data-page');
        openPage(page);
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={componentClasses.wrapper} onTouchTap={stopPropagation}>
            <ul className={navListClasses.list}>
                <li onClick={clickHandler} data-page="">
                    <span>Услуги</span>
                </li>
                <li onClick={clickHandler} data-page="about">
                    <span>О компании</span>
                </li>
                <li onClick={clickHandler} data-page="contacts">
                    <span>Контакты</span>
                </li>
            </ul>
        </div>
    );
};

export default InfoMenu;