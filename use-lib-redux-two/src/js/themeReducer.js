import { THEME_CHANGE } from './types.js';

const initThemeState = {
    value: 'light',
};

export function themeReducer(state = initThemeState, action) {
    const newState = { ...state };
    switch (action.type) {
        case THEME_CHANGE:
            newState.value = action.value;
            return newState;
        default:
            return state;
    }
}
