import { COUNTER_MINUS, COUNTER_PLUS, COUNTER_RESET } from './types.js';

export function counterPlus() {
    return {
        type: COUNTER_PLUS,
    };
}

export function counterMinus() {
    return {
        type: COUNTER_MINUS,
    };
}

export function counterReset() {
    return {
        type: COUNTER_RESET,
    };
}
