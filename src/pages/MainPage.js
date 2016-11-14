import React from 'react';
import classes from '../css/pages/main.css';

const MainPage = () => {
    return (
        <div className={classes.wrapper}>
            <a href="/delivery" className={classes.accent}>
                <p className="title">Доставка и разгрузка</p>
            </a>

            <a href="/moscow/click-collect">
                <p className="title">Заказ на сайте - самовывоз из магазина г. Москва</p>
            </a>

            <a href="/exchange">
                <p>Обмен, возврат товара</p>
            </a>

            <a href="http://habrahabr.ru">
                <p>Habr</p>
            </a>
        </div>
    );
};

export default MainPage;