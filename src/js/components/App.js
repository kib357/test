import React, { Component } from 'react';
import favicon from "../../../public/img/favicon.ico";
import Helmet from "../containers/Helmet";
import CitiesLoader from "../containers/CitiesLoader";
import Header from "./Header";

class App extends Component {
    render() {
        return (
            <div>
                <Helmet link={[{ rel: 'Shortcut Icon', href: favicon }]} />
                <CitiesLoader>
                    <div>
                        <Header />
                    </div>
                </CitiesLoader>
            </div>
        );
    }
}

export default App;