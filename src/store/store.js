import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import photographerReducer from './reducers/photographerReducer';
import userReducer from './reducers/userReducer';
import {reducer as formReducer } from 'redux-form';
const rootReducer = combineReducers({
photographerReducer,
userReducer,
form: formReducer


})
const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
applyMiddleware(thunk)
);

const store = createStore(rootReducer, enhancer)


export default store
