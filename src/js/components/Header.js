import React from 'react';
import CurrentCityContainer from "../containers/CurrentCityContainer";
import logoSrc from "../../../public/img/logo.svg";

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

        </div>
    );
};

export default Header;