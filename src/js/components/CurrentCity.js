import React, { Component } from 'react';
import selectClasses from '../../css/select.css';

const styles = {
    wrapper: {
        marginLeft: 9,
    },
    hidden: {
        overflow: "hidden",
        height: 0,
    },
};

class CurrentCity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectWidth: 0,
        };
        this.adjustWidth = this.adjustWidth.bind(this);
    }

    componentDidMount() {
        this.adjustWidth();
    }

    componentDidUpdate(prevProps, prevState) {
        this.adjustWidth();
    }

    adjustWidth() {
        const s = this.refs.span;
        if (s == null) {
            return;
        }
        const selectWidth = s.offsetWidth + 8;
        if (selectWidth !== this.state.selectWidth) {
            this.setState({ selectWidth });
        }
    }

    render() {
        const {list = [], currentId, selectCity} = this.props;
        const selectStyle = { width: this.state.selectWidth };
        const currentItem = list.find(i => i.id === currentId) || list[0];
        return (
            <div className={selectClasses.wrapper} style={styles.wrapper}>
                <select
                    value={currentId} onChange={selectCity}
                    className={selectClasses.element + " " + (this.props.selectClassName || "")}
                    style={selectStyle}
                    >
                    {
                        list.map((c, i) => (
                            <option key={i} value={c.id}>{decodeURIComponent(c.name)}</option>
                        ))
                    }
                </select>
                <div className={selectClasses.arrow}></div>
                <div style={styles.hidden}>
                    <span ref="span" className={(this.props.selectClassName || "")}>{currentItem.name}</span>
                </div>
            </div>
        );
    }
}

export default CurrentCity;