import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './rootReducer.js';
import { counterMinus, counterPlus, counterReset, themeChange } from './actions.js';

const counter = document.getElementById('counter');
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const resetBtn = document.getElementById('reset');
const themeBtn = document.getElementById('theme');

const logging = store => next => action => {
    console.log('call dispatch', action);
    next(action);
    console.log('next state', store.getState());
};
const something = store => next => action => {
    console.log('something before dispatch');
    next(action);
    console.log('something after dispatch');
};
const blablabla = store => next => action => {
    console.log('blablabla before dispatch');
    next(action);
    console.log('blablabla after dispatch');
};

// Создание и инициализация хранилища
const store = createStore(rootReducer, applyMiddleware(blablabla, something, logging));

/*
const store = createStore(rootReducer);
const dispatchAndLogging = action => {
    console.log('call dispatch', action);
    store.dispatch(action);
    console.log('next state', store.getState());
};
*/

/*
const store = createStore(rootReducer);
const next = store.dispatch;
store.dispatch = action => {
    console.log('call dispatch', action);
    next(action);
    console.log('next state', store.getState());
};
*/

/*
const store = createStore(rootReducer);
const patchStoreAddLogging = store => {
    const next = store.dispatch; // здесь «родной» dispatch
    store.dispatch = action => {
        console.log('call dispatch', action);
        next(action);
        console.log('next state', store.getState());
    };
};
const patchStoreAddSomething = store => {
    const next = store.dispatch; // здесь «родной» dispatch + logging
    store.dispatch = action => {
        console.log('something before dispatch');
        next(action);
        console.log('something after dispatch');
    };
};
const patchStoreAddBlablabla = store => {
    const next = store.dispatch; // здесь «родной» dispatch + logging + something
    store.dispatch = action => {
        console.log('blablabla before dispatch');
        next(action);
        console.log('blablabla after dispatch');
    };
};
patchStoreAddLogging(store);
patchStoreAddSomething(store);
patchStoreAddBlablabla(store);
*/

/*
const store = createStore(rootReducer);
const logging = store => {
    const next = store.dispatch;
    const patch = action => {
        console.log('call dispatch', action);
        next(action);
        console.log('next state', store.getState());
    };
    return patch;
};
const something = store => {
    const next = store.dispatch;
    const patch = action => {
        console.log('something before dispatch');
        next(action);
        console.log('something after dispatch');
    };
    return patch;
};
const blablabla = store => {
    const next = store.dispatch;
    const patch = action => {
        console.log('blablabla before dispatch');
        next(action);
        console.log('blablabla after dispatch');
    };
    return patch;
};
// такую функцию могли бы предоставить разработчики Redux
const applyStorePatches = (store, patches) => {
    patches.forEach(patch => {
        store.dispatch = patch(store);
    });
};
const patches = [logging, something, blablabla];
applyStorePatches(store, patches);
*/

/*
const store = createStore(rootReducer);
const logging = store => next => action => {
    console.log('call dispatch', action);
    next(action);
    console.log('next state', store.getState());
};
const something = store => next => action => {
    console.log('something before dispatch');
    next(action);
    console.log('something after dispatch');
};
const blablabla = store => next => action => {
    console.log('blablabla before dispatch');
    next(action);
    console.log('blablabla after dispatch');
};
// такую функцию могли бы предоставить разработчики Redux
const applyStorePatches = (store, patches) => {
    const wrappers = patches.map(patch => patch(store));
    wrappers.forEach(wrapper => {
        store.dispatch = wrapper(store.dispatch);
    });
};
const patches = [logging, something, blablabla];
applyStorePatches(store, patches);
*/

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
