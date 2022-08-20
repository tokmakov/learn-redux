import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './rootReducer.js';
import { fetchUsersProcess } from './actions.js';

// Создание и инициализация хранилища
const store = createStore(rootReducer, applyMiddleware(logger));

// Подписываемся на событие изменения
store.subscribe(() => {
    const state = store.getState();
    // новый рендер после изменения
    renderUsers(state);
});
// Первый рендер после инициализации
store.dispatch({ type: 'START_APPLICATION' });

// Функция рендера после изменения
function renderUsers({ users, loading, error }) {
    if (users.length) {
        const content = JSON.stringify(users, null, '  ');
        document.getElementById('users').innerHTML = `<pre>${content}</pre>`;
    } else {
        document.getElementById('users').textContent = '';
    }
    if (loading) {
        document.getElementById('loading').style.display = '';
    } else {
        document.getElementById('loading').style.display = 'none';
    }
    if (error) {
        document.querySelector('#error .alert').textContent = error;
        document.getElementById('error').style.display = '';
    } else {
        document.querySelector('#error .alert').textContent = '';
        document.getElementById('error').style.display = 'none';
    }
}

// Обработчик клика по кнопке
document.getElementById('load').addEventListener('click', () => {
    store.dispatch(fetchUsersProcess(store.dispatch));
});
