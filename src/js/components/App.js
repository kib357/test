import React, { Component } from 'react';
import favicon from '../../../public/img/favicon.ico';
import appClasses from '../../css/app.css';
import Helmet from '../containers/Helmet';
import UrlRewrite from '../containers/UrlRewrite';
import CitiesLoader from '../containers/CitiesLoader';
import HeaderContainer from '../containers/HeaderContainer';
import ContentContainer from '../containers/ContentContainer';

class App extends Component {
    render() {
        return (
            <div>
                <Helmet link={[{ rel: 'Shortcut Icon', href: favicon }]} />
                <UrlRewrite>
                    <CitiesLoader>
                        <div className={appClasses.wrapper}>
                            <HeaderContainer />
                            <ContentContainer />
                        </div>
                    </CitiesLoader>
                </UrlRewrite>
            </div>
        );
    }
}

export default App;
