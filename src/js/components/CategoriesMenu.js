import React, { Component } from 'react';
import backIcon from '../../../public/img/back.svg';
import arrowIcon from '../../../public/img/chevron_right.svg';
import Loader from '../components/Loader';
import componentClasses from '../../css/categoriesMenu.css';

const styles = {
    loader: {
        position: 'absolute',
    },
    wrapperShow: {
        transform: 'translateX(0)',
        transition: 'transform .15s ease-out',
    },
    error: {
        padding: '0 14px',
        color: '#F44336',
    },
};

class CategoriesMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { back: false };
        this.categoryClickHandler = this._categoryClickHandler.bind(this);
    }

    componentDidMount() {
        this._fetchItemsIfNeed();
    }

    componentDidUpdate() {
        this._fetchItemsIfNeed();
        if (this.state.hide) {
            setTimeout(() => {
                this.setState({ hide: false });
            });
        }
    }

    _fetchItemsIfNeed() {
        const {items, fetching, error, current, fetchSubCategories} = this.props;
        if (items == null && !fetching && !error) {
            fetchSubCategories(current.id);
        }
    }

    _categoryClickHandler(e) {
        const id = e.currentTarget.getAttribute('data-cat-id');
        const back = e.currentTarget.getAttribute('data-back');
        const isLeaf = e.currentTarget.getAttribute('data-leaf');
        if (isLeaf) {
            this.props.openCategory(id);
        } else {
            const hide = true;
            this.setState({ back, hide }, () => {
                this.props.selectMenuCategory(id);
            });
        }
    }

    render() {
        const {items, current, fetching, error} = this.props;
        const slideStyle = {};
        slideStyle['transform'] = `translateX(${this.state.back ? '-' : ''}24px)`;
        if (error) {
            return <p style={styles.error}>Ошибка при загрузке категорий, пожалуйста обновите страницу.</p>;
        }
        return (
            <div
                className={componentClasses.wrapper}
                style={(fetching || this.state.hide) ? slideStyle : styles.wrapperShow}
                >
                {
                    fetching ?
                        <Loader style={styles.loader} />
                        :
                        <div>
                            {current.id !== 0 &&
                                <div className={componentClasses.listHeader}>
                                    <div
                                        onTouchTap={this.categoryClickHandler}
                                        data-back={true}
                                        data-cat-id={current.parent_id}
                                        >
                                        <img src={backIcon} />
                                    </div>
                                    <span>{current.name}</span>
                                </div>
                            }
                            {items &&
                                <ul className={componentClasses.list}>
                                    {
                                        items.length === 0 ?
                                            <li className={componentClasses.emptyLi}>
                                                <span>В этой категории ничего нет</span>
                                            </li>
                                            :
                                            items.map((e, i) => (
                                                <li key={i}
                                                    onTouchTap={this.categoryClickHandler}
                                                    data-cat-id={e.id}
                                                    data-leaf={e.is_leaf_category}>
                                                    <span>{e.name}</span>
                                                    {e.is_leaf_category ? null : <img src={arrowIcon} />}
                                                </li>
                                            ))
                                    }
                                </ul>
                            }
                        </div>
                }
            </div>
        );
    }
}

export default CategoriesMenu;