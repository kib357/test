import React, { Component } from 'react';
import Loader from './Loader';
import componentClasses from '../../css/staticPage.css';

class StaticPage extends Component {
    componentDidMount() {
        this._loadContentIfNeed();
    }

    componentDidUpdate() {
        this._loadContentIfNeed();
    }

    _loadContentIfNeed() {
        const {content, fetching, error, fetchPage} = this.props;
        if (!content && !fetching && !error) {
            fetchPage();
        }
    }

    render() {
        const {content, fetching, error} = this.props;
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