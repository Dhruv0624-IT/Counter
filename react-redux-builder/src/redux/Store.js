import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { userReducer } from './UserReducer';
import { productReducer } from './ProductReducer';

const rootReducer = combineReducers({
  users: userReducer,
  products: productReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
