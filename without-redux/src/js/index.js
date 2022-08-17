import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

const counter = document.getElementById('counter');
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const resetBtn = document.getElementById('reset');

// Здесь будем хранить состояние счетчика
let state = 0;
render();

function render() {
    counter.textContent = state.toString();
}

plusBtn.addEventListener('click', () => {
    state++;
    render();
});

minusBtn.addEventListener('click', () => {
    state--;
    render();
});

resetBtn.addEventListener('click', () => {
    state = 0;
    render();
});
