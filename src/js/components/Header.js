import React, { Component } from 'react';
import cl from 'classnames';
import logoSrc from '../../../public/img/logo.svg';
import accountIcon from '../../../public/img/account.svg';
import headerClasses from '../../css/header.css';
import CurrentCityContainer from '../containers/CurrentCityContainer';
import NavContainer from '../containers/NavContainer';
import NavMenuContainer from '../containers/NavMenuContainer';
import scroll from '../services/scroll';

class header extends Component {
    constructor(props) {
        super(props);
        this.ticking = false;
        this.position = 0;
        this.state = {
            min: false,
        };
        this.updateView = this._updateView.bind(this);
        this.logoClickHandler = this._logoClickHandler.bind(this);
    }

    _updateView(position, direction) {
        const min = position > 89 && direction === 'down';
        if (min !== this.state.min) {
            this.setState({ min });
        }
    }

    componentDidMount() {
        scroll.on('change', this.updateView);
        this.updateView();
    }

    componentWillUnmount() {
        scroll.removeListener('change', this.updateView);
    }

    _logoClickHandler(e) {
        e.preventDefault();
        this.props.openUri('/');
    }

    render() {
        const {menu} = this.props;

        const wrapperClassName = {};
        wrapperClassName[headerClasses.wrapper] = true;
        wrapperClassName[headerClasses.fixed] = !!menu;
        wrapperClassName[headerClasses.min] = this.state.min;
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
                        <a href="/" onTouchTap={this.logoClickHandler}>
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
    }
}

export default header;