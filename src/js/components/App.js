import React, { Component } from 'react';
import favicon from '../../../public/img/favicon.ico';
import Helmet from '../containers/Helmet';
import CitiesLoader from '../containers/CitiesLoader';
import HeaderContainer from '../containers/HeaderContainer';

class App extends Component {
    render() {
        return (
            <div>
                <Helmet link={[{ rel: 'Shortcut Icon', href: favicon }]} />
                <CitiesLoader>
                    <div>
                        <HeaderContainer />
                    </div>
                </CitiesLoader>
            </div>
        );
    }
}

export default App;