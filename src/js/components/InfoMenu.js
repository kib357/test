import React from 'react';
import navListClasses from '../../css/navList.css';
import componentClasses from '../../css/infoMenu.css';

const InfoMenu = ({openPage}) => {
    const clickHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const page = e.currentTarget.getAttribute('data-page');
        openPage(page);
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={componentClasses.wrapper} onTouchTap={stopPropagation}>
            <ul className={navListClasses.list}>
                <li>
                    <a onTouchTap={clickHandler} data-page="">
                        <span>Услуги</span>
                    </a>
                </li>
                <li>
                    <a onTouchTap={clickHandler} data-page="about">
                        <span>О компании</span>
                    </a>
                </li>
                <li>
                    <a onTouchTap={clickHandler} data-page="contacts">
                        <span>Контакты</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default InfoMenu;