import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import store from './store';
import {Provider} from 'react-redux';

import App from './components/app';

import './index.scss';



ReactDOM.render(
    <Provider store = {store}>
        <App /> 
    </Provider>
, document.getElementById('app'));