import React, { Component } from 'react';
import Loader from './Loader';
import componentClasses from '../../css/staticPage.css';
import MainPage from '../../pages/MainPage';
import Breadcrumbs from './Breadcrumbs';

const localPages = {
    main: { text: <MainPage />, name: '', disableCardStyle: true },
};

const breadcrumbsItems = [{ path: '/', name: 'На главную' }];

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
        const localPage = localPages[pageName];
        return (
            <div className={componentClasses.wrapper} ref="wrapper">
                {pageName !== 'main' && <Breadcrumbs items={breadcrumbsItems} />}
                <div className={(localPage || {}).disableCardStyle ? componentClasses.simpleContent : componentClasses.content}>
                    {localPage ?
                        <div>
                            {localPage.name && <h2>{localPage.name}</h2>}
                            <div>
                                {localPage.text}
                            </div>
                        </div>
                        :
                        <div>
                            <Loader position="relative" hide={!fetching} />
                            {error && <h2 className={componentClasses.error}>{error}</h2>}
                            {content && <div>
                                <h2>{content.name}</h2>
                                <div dangerouslySetInnerHTML={{ __html: content.text }}></div>
                            </div>}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default StaticPage;