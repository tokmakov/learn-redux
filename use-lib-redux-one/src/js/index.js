import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import { createStore } from 'redux';
import { rootReducer } from './rootReducer.js';
import { counterMinus, counterPlus, counterReset } from './actions.js';

const counter = document.getElementById('counter');
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const resetBtn = document.getElementById('reset');

// Создание и инициализация хранилища
const initState = {
    count: 0,
};
const store = createStore(rootReducer, initState);

// Подписываемся на событие изменения
store.subscribe(() => {
    const state = store.getState();
    // новый рендер после изменения
    renderCounter(state.count);
});
// Первый рендер после инициализации
store.dispatch({ type: 'START' });

function renderCounter(count) {
    counter.textContent = count.toString();
}

plusBtn.addEventListener('click', () => {
    store.dispatch(counterPlus());
});

minusBtn.addEventListener('click', () => {
    store.dispatch(counterMinus());
});

resetBtn.addEventListener('click', () => {
    store.dispatch(counterReset());
});
