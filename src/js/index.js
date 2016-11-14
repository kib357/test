import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import '../css/normalize.css';
import '../css/index.css';
//Image for 'about' page
import '../../public/img/info_10_06_2016.jpg';

// Mobile debug only
// window.onerror = function (message, url, lineNumber) {
//     document.body.innerHTML = message;
// };

const store = configureStore();

render(
    <Root store={store} />,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const RootContainer = require('./containers/Root').default;
        render(
            <AppContainer>
                <RootContainer store={store} />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}