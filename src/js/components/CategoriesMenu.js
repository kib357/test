import React, { Component } from 'react';
import Loader from '../components/Loader';
import componentClasses from '../../css/categoriesMenu.css';

const styles = {
    loader: {
        position: 'absolute',
    },
};

class CategoriesMenu extends Component {
    componentDidMount() {
        const {items, fetching, error, fetchSubCategories} = this.props;
        if (items == null && !fetching && !error) {
            fetchSubCategories();
        }
    }

    render() {
        const {items, fetching, error} = this.props;
        if (error) {
            return <p>{error}</p>;
        }
        return (
            <div className={componentClasses.wrapper}>
                {
                    fetching ?
                        <Loader style={styles.loader} />
                        :
                        <ul className={componentClasses.list}>
                            {
                                (items || []).map((e, i) => (
                                    <li key={i}>
                                        <span>{e.name}</span>
                                    </li>
                                ))
                            }
                        </ul>
                }
            </div>
        );
    }
}

export default CategoriesMenu;