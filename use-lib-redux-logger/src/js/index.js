import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import { createLogger } from 'redux-logger';
import { rootReducer } from './rootReducer.js';
import { counterMinus, counterPlus, counterReset, themeChange } from './actions.js';
import { THEME_CHANGE } from './types';

const counter = document.getElementById('counter');
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const resetBtn = document.getElementById('reset');
const themeBtn = document.getElementById('theme');

const logger = createLogger({
    // не логировать action THEME_CHANGE
    predicate: (getState, action) => action.type !== THEME_CHANGE,
});

// Создание и инициализация хранилища
const store = createStore(rootReducer, applyMiddleware(logger));

// Подписываемся на событие изменения
store.subscribe(() => {
    const state = store.getState();
    // новый рендер после изменения
    renderCounter(state.counter.count);
    renderTheme(state.theme.value);
});
// Первый рендер после инициализации
store.dispatch({ type: 'START' });

// Функции рендера после изменения
function renderCounter(count) {
    counter.textContent = count.toString();
}
function renderTheme(newTheme) {
    const oldTheme = newTheme === 'light' ? 'dark' : 'light';
    document.body.classList.remove(oldTheme);
    document.body.classList.add(newTheme);
}

// Обработчики клика по кнопкам
plusBtn.addEventListener('click', () => {
    store.dispatch(counterPlus());
});
minusBtn.addEventListener('click', () => {
    store.dispatch(counterMinus());
});
resetBtn.addEventListener('click', () => {
    store.dispatch(counterReset());
});
themeBtn.addEventListener('click', () => {
    const state = store.getState();
    const oldTheme = state.theme.value;
    const newTheme = oldTheme === 'light' ? 'dark' : 'light';
    store.dispatch(themeChange(newTheme));
});
