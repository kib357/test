import React from 'react';
import backIcon from '../../../public/img/back.svg';
import arrowIcon from '../../../public/img/chevron_right.svg';
import navListClasses from '../../css/navList.css';

const CategoriesList = ({category, items, categoryClickHandler}) => {
    return (
        <div>
            {category.id !== 0 &&
                <div className={navListClasses.listHeader}>
                    <div
                        onTouchTap={categoryClickHandler}
                        data-back={true}
                        data-cat-id={category.parent_id}
                        >
                        <img src={backIcon} />
                    </div>
                    <span>{category.name}</span>
                </div>
            }
            {items &&
                <ul className={navListClasses.list}>
                    {
                        items.length === 0 ?
                            <li className={navListClasses.emptyLi}>
                                <span>В этой категории ничего нет</span>
                            </li>
                            :
                            items.map((e, i) => (
                                <li key={i}
                                    onTouchTap={categoryClickHandler}
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
    );
};

export default CategoriesList;