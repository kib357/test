import React, { Component } from 'react';
import backIcon from '../../../public/img/back.svg';
import arrowIcon from '../../../public/img/chevron_right.svg';
import Loader from '../components/Loader';
import componentClasses from '../../css/categoriesMenu.css';

const styles = {
    loader: {
        position: 'absolute',
    },
};

class CategoriesMenu extends Component {
    constructor(props) {
        super(props);
        this.categoryClickHandler = this._categoryClickHandler.bind(this);
    }

    componentDidMount() {
        this._fetchItemsIfNeed();
    }

    componentDidUpdate() {
        this._fetchItemsIfNeed();
    }

    _fetchItemsIfNeed() {
        const {items, fetching, error, current, fetchSubCategories} = this.props;
        if (items == null && !fetching && !error) {
            fetchSubCategories(current.id);
        }
    }

    _categoryClickHandler(e) {
        const id = e.currentTarget.getAttribute('data-cat-id');
        const isLeaf = e.currentTarget.getAttribute('data-leaf');
        if (isLeaf) {
            (() => { })();
        } else {
            this.props.selectMenuCategory(id);
        }
    }

    render() {
        const {items, current, fetching, error} = this.props;
        if (error) {
            return <p>{error}</p>;
        }
        return (
            <div className={componentClasses.wrapper}>
                {
                    fetching ?
                        <Loader style={styles.loader} />
                        :
                        <div>
                            {current.id !== 0 &&
                                <div className={componentClasses.listHeader}>
                                    <div
                                        onClick={this.categoryClickHandler}
                                        data-cat-id={current.parent_id}
                                        >
                                        <img src={backIcon} />
                                    </div>
                                    <span>{current.name}</span>
                                </div>
                            }
                            <ul className={componentClasses.list}>
                                {
                                    (items || []).map((e, i) => (
                                        <li key={i}
                                            onClick={this.categoryClickHandler}
                                            data-cat-id={e.id}
                                            data-leaf={e.is_leaf_category}>
                                            <span>{e.name}</span>
                                            {e.is_leaf_category ? null : <img src={arrowIcon} />}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                }
            </div>
        );
    }
}

export default CategoriesMenu;