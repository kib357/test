import React, { Component } from 'react';
import Helmet from "../containers/Helmet";
import favicon from "../../../public/img/favicon.ico";
console.log("!!!", favicon);

class App extends Component {
    render() {
        return (
            <div>
                <Helmet link={[{ rel: 'Shortcut Icon', href: favicon }]} />

            </div>
        );
    }
}

export default App;