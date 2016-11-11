import React from 'react';
import navListClasses from '../../css/navList.css';

const InfoMenu = ({openPage}) => {
    const clickHandler = (e) => {
        const page = e.currentTarget.getAttribute('data-page');
        openPage(page);
    };
    return (
        <div>
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