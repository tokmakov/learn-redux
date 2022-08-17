import { combineReducers } from 'redux';
import { counterReducer } from './counterReducer.js';
import { themeReducer } from './themeReducer.js';

export const rootReducer = combineReducers({
    counter: counterReducer,
    theme: themeReducer,
});
