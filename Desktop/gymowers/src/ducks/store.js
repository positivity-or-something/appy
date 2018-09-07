import {createStore, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware';
import productReducer from './productReducer';

export default createStore( productReducer, applyMiddleware( promiseMiddleware() ) );