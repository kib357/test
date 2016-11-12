import React, { Component } from 'react';
import chevronIcon from '../../../public/img/chevron_right.svg';
import componentClasses from '../../css/categoryCard.css';

class ProductCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {name, uri_name, onClick } = this.props;
        return (
            <div className={componentClasses.wrapper} onTouchTap={onClick} data-uri={uri_name}>
                <div className={componentClasses.content}>
                    <div className={componentClasses.header}>
                        <h3 className={componentClasses.primaryText}>{name}</h3>
                        <img src={chevronIcon} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductCard;