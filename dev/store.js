import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger'
import promise from 'redux-promise-middleware';


import answerReducer from './reducers/answerReducer';
import questionReducer from './reducers/questionReducer';


//middleware
/*
const logMiddleware = store => next => action =>{
        console.log(' action = ',action);
        next(action);
};
*/

const store = createStore(
    combineReducers({
        answerReducer,
        questionReducer

    }),
    {},
    applyMiddleware(logger,promise())
    
);

export default store;