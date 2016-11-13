import React, { Component } from 'react';
import ScrollPositionStore from '../services/scroll';
import { isElementInViewport } from '../services/utils';
import formsClasses from '../../css/forms.css';

class ScrollButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'inView': false,
        };
        this.scrollChanged = p => this._scrollChanged(p);
        this.checkInView = p => this._checkInView(p);
    }

    componentDidMount() {
        ScrollPositionStore.on('change', this.scrollChanged);
        this.checkInView();
    }

    componentWillUnmount() {
        ScrollPositionStore.removeListener('change', this.scrollChanged);
    }

    _scrollChanged() {
        this.checkInView();
    }

    _checkInView() {
        let inView = isElementInViewport(this.refs.root);
        if (inView !== this.state.inView) {
            this.setState({ inView: inView }, () => {
                if (this.props.autoLoad && !this.props.fetching && typeof this.props.onClick === 'function') {
                    this.props.onClick();
                }
            });
        }
    }

    render() {
        return (
            <div ref="root">
                <button
                    type="button"
                    disabled={this.props.fetching}
                    onTouchTap={this.props.onClick}
                    className={formsClasses.btn + ' ' + formsClasses.btnFullWidth}>
                    {this.props.label}
                </button>
            </div>
        );
    }
}

export default ScrollButton;