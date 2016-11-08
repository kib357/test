import React from 'react';
import logoSrc from "../../../public/img/logo.svg";
import headerClasses from "../../css/header.css";
import CurrentCityContainer from "../containers/CurrentCityContainer";
import NavContainer from "../containers/NavContainer";

const Header = () => {
    return (
        <div>
            <div className={headerClasses.userBar}>
                <CurrentCityContainer selectClassName={headerClasses.select} />
                <div className={headerClasses.signIn}>
                    Вход
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
        </div>
    );
};

export default Header;