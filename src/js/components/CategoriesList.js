import React from 'react';
import backIcon from '../../../public/img/back.svg';
import arrowIcon from '../../../public/img/chevron_right.svg';
import navListClasses from '../../css/navList.css';
import Loader from '../components/Loader';

const CategoriesList = ({category, items, categoryClickHandler}) => {
    return (
        <div>
            <Loader position="absolute" hide={items != null} />
            {items != null && (category.id !== 0) &&
                <div className={navListClasses.listHeader}>
                    <a
                        onTouchTap={categoryClickHandler}
                        data-back={true}
                        data-cat-id={category.parent_id}
                        >
                        <img src={backIcon} />
                    </a>
                    <span>{category.name}</span>
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
                                        onTouchTap={categoryClickHandler}
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