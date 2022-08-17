import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import { createStore } from 'redux';
import { rootReducer } from './rootReducer.js';
import { counterMinus, counterPlus, counterReset, themeChange } from './actions.js';

const counter = document.getElementById('counter');
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const resetBtn = document.getElementById('reset');
const themeBtn = document.getElementById('theme');

// Создание и инициализация хранилища
const store = createStore(rootReducer);

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
