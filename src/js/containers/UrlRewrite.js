import React, { Component } from 'react';
import { getURLParameter } from '../services/utils';
import history from '../services/history';

class UrlRewrite extends Component {
    constructor(props) {
        super(props);
        this.state = { ready: false };
    }

    componentDidMount() {
        const p = getURLParameter('p');
        if (p) {
            history.push(p);
        }
        this.setState({ ready: true });
    }

    render() {
        return (this.state.ready ? this.props.children : <div></div>);
    }
}

export default UrlRewrite;