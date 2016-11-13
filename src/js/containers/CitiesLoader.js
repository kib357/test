import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CitiesActions from '../actions/CitiesActions';
import Loader from '../components/Loader';

class CitiesLoader extends Component {
    componentDidMount() {
        this.props.fetchCities();
    }

    render() {
        if (this.props.list === null || this.props.current === null) {
            return <Loader text="Загрузка списка городов..." />;
        } else {
            return this.props.children;
        }
    }
}

const citiesLoader = connect(
    state => state.cities,
    dispatch => (bindActionCreators(CitiesActions, dispatch))
)(CitiesLoader);

export default citiesLoader;