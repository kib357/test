import React from 'react';
import cl from 'classnames';
import logoSrc from '../../../public/img/logo.svg';
import accountIcon from '../../../public/img/account.svg';
import headerClasses from '../../css/header.css';
import CurrentCityContainer from '../containers/CurrentCityContainer';
import NavContainer from '../containers/NavContainer';
import NavMenuContainer from '../containers/NavMenuContainer';

const Header = ({menu}) => {
    const wrapperClassName = {};
    wrapperClassName[headerClasses.wrapper] = true;
    wrapperClassName[headerClasses.fixed] = !!menu;
    return (
        <div className={cl(wrapperClassName)}>
            <div className={headerClasses.userBar}>
                <CurrentCityContainer selectClassName={headerClasses.select} />
                <div className={headerClasses.signIn}>
                    <img src={accountIcon} alt="" />
                    <span>Вход</span>
                </div>
            </div>
            <div className={headerClasses.logoAndPhone}>
                <div className={headerClasses.logo}>
                    <a href="/">
                        <img src={logoSrc} alt="Строительный двор" />
                    </a>
                </div>
                <div className={headerClasses.phoneLink}>
                    <a href="tel:88003335577">8 800 333-55-77</a>
                </div>
            </div>
            <NavContainer />
            {menu && <NavMenuContainer />}
        </div>
    );
};

export default Header;