import {createStore, applyMiddleware} from 'redux';
import reducer from "./redux/rootReducer";
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
export const store = createStoreWithMiddleware(reducer);