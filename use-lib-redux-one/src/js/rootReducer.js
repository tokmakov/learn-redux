import { COUNTER_PLUS, COUNTER_MINUS, COUNTER_RESET } from './types.js';

export function rootReducer(state, action) {
    const newState = { ...state };
    switch (action.type) {
        case COUNTER_PLUS:
            newState.count++;
            return newState;
        case COUNTER_MINUS:
            newState.count--;
            return newState;
        case COUNTER_RESET:
            newState.count = 0;
            return newState;
        default:
            return newState;
    }
}
