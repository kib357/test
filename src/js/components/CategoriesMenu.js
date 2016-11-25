import React, { Component } from 'react';
import componentClasses from '../../css/categoriesMenu.css';
import backIcon from '../../../public/img/back.svg';
import CategoriesList from './CategoriesList';

const styles = {
    error: {
        padding: '0 14px',
        color: '#F44336',
    },
};

class CategoriesMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { back: false, stack: [] };
        this.categoryClickHandler = this._categoryClickHandler.bind(this);
        this.closeClickHandler = this._closeClickHandler.bind(this);
    }

    componentDidMount() {
        this._fetchItemsIfNeed();
    }

    componentDidUpdate() {
        this._fetchItemsIfNeed();
        if (this.state.hide) {
            setTimeout(() => {
                this.setState({ hide: false });
            }, 50);
        }
    }

    _fetchItemsIfNeed() {
        const {items, fetching, error, current, fetchSubCategories} = this.props;
        if (items == null && !fetching && !error) {
            fetchSubCategories(current.id);
        }
    }

    _categoryClickHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        const id = e.currentTarget.getAttribute('data-cat-id');
        const back = e.currentTarget.getAttribute('data-back');
        const isLeaf = e.currentTarget.getAttribute('data-leaf');
        if (isLeaf) {
            console.log('LEAF!!!');
            this.props.openCategory(id);
        } else {
            this.setState({ back, hide: !back }, () => {
                this.props.selectMenuCategory(id);
            });
        }
    }

    _closeClickHandler() {
        this.props.toggleMenu();
    }

    stopPropagation(e) {
        e.stopPropagation();
    }

    render() {
        const {openedCategories, parentCategories, current, hItems, error} = this.props;
        // const slideStyle = {};
        // slideStyle['transform'] = `translateX(${this.state.back ? '-' : ''}100%)`;
        if (error) {
            return <p style={styles.error}>Ошибка при загрузке категорий, пожалуйста обновите страницу.</p>;
        }
        return (
            <div className={componentClasses.wrapper} onTouchTap={this.stopPropagation}>
                <img src={backIcon} style={{ display: 'none' }} />
                {
                    (openedCategories || []).map((e, i) => (
                        <div
                            key={i}
                            className={componentClasses.menu + (parentCategories.indexOf(e.id) >= 0 || (e.id === current.id && !this.state.hide) ? ' ' + componentClasses.menuShow : '')}
                            >
                            <CategoriesList
                                category={e}
                                items={hItems[i]}
                                onCategoryClick={this.categoryClickHandler}
                                onCloseClick={this.closeClickHandler}
                                />
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default CategoriesMenu;