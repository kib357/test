import React, { Component } from 'react';
import searchIcon from '../../../public/img/search.svg';
import componentClasses from '../../css/searchMenu.css';
import formsClasses from '../../css/forms.css';
import Loader from '../components/Loader';

const SEARCH_TIMEOUT = 500;
const escapeRegExp = (str) => {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};

class SearchMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
        this._queryChangeHandler = this.queryChangeHandler.bind(this);
        this._resultClickHandler = this.resultClickHandler.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.refs.input.focus();
        });
    }

    _queryChangeHandler(e) {
        const query = e.target.value;
        clearTimeout(this.state.timer);
        const timer = setTimeout(() => {
            this.props.fetchSearchResults(this.state.query);
        }, SEARCH_TIMEOUT);
        this.setState({ timer, query });
    }

    _resultClickHandler(e) {
        const genericProductId = e.currentTarget.getAttribute('data-id');
        this.props.openSearchPage(genericProductId);
    }

    stopPropagation(e) {
        e.stopPropagation();
    }

    render() {
        const {query} = this.state;
        const {results, query: resultsQuery, fetching} = this.props;
        const searchData = escapeRegExp(this.state.query)
            .trim()
            .split(' ')
            .filter(i => i);
        const searchReg = new RegExp('(' + searchData.join('|') + ')', 'ig');
        return (
            <div className={componentClasses.wrapper} >
                <div className={componentClasses.inputWrapper} onTouchTap={this.stopPropagation}>
                    <input
                        ref="input"
                        type="text"
                        placeholder="Найти в каталоге"
                        value={query}
                        onChange={this.queryChangeHandler}
                        className={formsClasses.textInput + ' ' + componentClasses.input}
                        />
                    <img src={searchIcon} />
                </div>
                <div className={componentClasses.loader}>
                    <Loader position="relative" hide={!fetching} style={{ transition: 'opacity .1s linear .1s' }} />
                </div>
                {results && resultsQuery === query &&
                    <div className={componentClasses.resultsWrapper}>
                        {results.length > 0 ?
                            <div className={componentClasses.results} onTouchTap={this.stopPropagation}>
                                {results.map((e, i) => {
                                    const {id, name: resName, doc_count} = e;
                                    let name = resName.split(searchReg);
                                    for (let j = 1; j < name.length; j += 2) {
                                        name[j] = <span key={j + 'number'} className={componentClasses.highlight}>{name[j]}</span>;
                                    }
                                    return <div
                                        key={i}
                                        data-id={id}
                                        className={componentClasses.result}
                                        onTouchTap={this.resultClickHandler}
                                        >
                                        <div className={componentClasses.name}>
                                            {name}
                                        </div>
                                        {doc_count}
                                    </div>;
                                })}
                            </div>
                            :
                            <div className={componentClasses.results} onTouchTap={this.stopPropagation}>
                                <div className={componentClasses.result}>
                                    <div className={componentClasses.name}>
                                        Ничего не найдено :'(
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

export default SearchMenu;