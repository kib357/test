import React, { Component } from 'react';
import Loader from './Loader';
import componentClasses from '../../css/staticPage.css';
import MainPage from '../../pages/MainPage';

const localPages = {
    main: { text: <MainPage />, name: '', disableCardStyle: true },
};

class StaticPage extends Component {
    componentDidMount() {
        this._loadContentIfNeed();
    }

    componentDidUpdate() {
        this._loadContentIfNeed();
    }

    _loadContentIfNeed() {
        const {pageName, content, fetching, error, fetchPage} = this.props;
        if (localPages[pageName]) { return }
        if (!content && !fetching && !error) {
            fetchPage();
        }
    }

    clickHandler(e) {
        console.log(e.nativeEvent);
        e.preventDefault();
    }

    render() {
        const {pageName, content, fetching, error} = this.props;
        const lp = localPages[pageName];
        if (lp) {
            return (
                <div className={componentClasses.wrapper}>
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
            <div className={componentClasses.wrapper}>
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