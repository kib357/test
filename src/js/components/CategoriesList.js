import React from 'react';
import backIcon from '../../../public/img/back.svg';
import arrowIcon from '../../../public/img/chevron_right.svg';
import clearIcon from '../../../public/img/clear.svg';
import navListClasses from '../../css/navList.css';
import Loader from '../components/Loader';

const CategoriesList = ({category, items, onCategoryClick, onCloseClick}) => {
    return (
        <div>
            <Loader position="absolute" hide={items != null} />
            {items != null &&
                <div className={navListClasses.listHeader}>
                    {category.id !== 0 && <a
                        onTouchTap={onCategoryClick}
                        data-back={true}
                        data-cat-id={category.parent_id}
                        >
                        <img src={backIcon} />
                    </a>}
                    <span>{category.name}</span>
                    {category.id === 0 && <a onTouchTap={onCloseClick}>
                        <img src={clearIcon} />
                    </a>}
                </div>
            }
            {items != null &&
                <ul className={navListClasses.list}>
                    {
                        items.length === 0 ?
                            <li className={navListClasses.emptyLi}>
                                <div>
                                    <span>В этой категории ничего нет</span>
                                </div>
                            </li>
                            :
                            items.map((e, i) => (
                                <li key={i}>
                                    <a
                                        onTouchTap={onCategoryClick}
                                        data-cat-id={e.id}
                                        data-leaf={e.is_leaf_category}
                                        >
                                        <span>{e.name}</span>
                                        {e.is_leaf_category ? null : <img src={arrowIcon} />}
                                    </a>
                                </li>
                            ))
                    }
                </ul>
            }
        </div>
    );
};

export default CategoriesList;