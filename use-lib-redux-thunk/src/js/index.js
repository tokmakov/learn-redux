import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer.js';
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } from './actions.js';

const fetchUsers = () => {
    return dispatch => {
        dispatch(fetchUsersRequest());
        setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(dataJson => {
                    const users = dataJson.map(user => {
                        return { id: user.id, name: user.name, email: user.email };
                    });
                    dispatch(fetchUsersSuccess(users));
                })
                .catch(error => {
                    dispatch(fetchUsersFailure(error.message));
                });
        }, 1000);
    };
};

// Создание и инициализация хранилища
const store = createStore(rootReducer, applyMiddleware(thunk));

// Подписываемся на событие изменения
store.subscribe(() => {
    const state = store.getState();
    // новый рендер после изменения
    renderUsers(state);
});
// Первый рендер после инициализации
store.dispatch({ type: 'START' });

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
    console.log(store.getState());
    store.dispatch(fetchUsers());
});
