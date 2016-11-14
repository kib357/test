import React, { Component } from 'react';
import Loader from './Loader';
import componentClasses from '../../css/staticPage.css';
import MainPage from '../../pages/MainPage';

const localPages = {
    main: { text: <MainPage />, name: '', disableCardStyle: true },
};

class StaticPage extends Component {
    componentDidMount() {
        this._loadContentAndAddHadlers();
    }

    componentDidUpdate() {
        this._loadContentAndAddHadlers();
    }

    _loadContentAndAddHadlers() {
        const {pageName, content, fetching, error, fetchPage, openUri} = this.props;
        if (!content && !localPages[pageName] && !fetching && !error) {
            return fetchPage();
        }
        if ((content || localPages[pageName]) && !fetching && !error) {
            const w = this.refs.wrapper;
            const links = w.getElementsByTagName('a');
            for (let i = 0; i < links.length; i++) {
                links[i].addEventListener('click', function (e) {
                    const href = this.getAttribute('href');
                    e.preventDefault();
                    openUri(href);
                });
            }
        }
    }

    render() {
        const {pageName, content, fetching, error} = this.props;
        const lp = localPages[pageName];
        if (lp) {
            return (
                <div className={componentClasses.wrapper} ref="wrapper">
                    <div className={lp.disableCardStyle ? '' : componentClasses.content}>
                        <div>
                            {lp.name && <h2>{lp.name}</h2>}
                            <div>
                                {lp.text}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className={componentClasses.wrapper} ref="wrapper">
                <div className={componentClasses.content}>
                    <Loader position="relative" hide={!fetching} />
                    {error && <h2 className={componentClasses.error}>{error}</h2>}
                    {content && <div>
                        <h2>{content.name}</h2>
                        <div dangerouslySetInnerHTML={{ __html: content.text }}></div>
                    </div>}
                </div>
            </div>
        );
    }
}

export default StaticPage;